import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import NavigationTabs from "./NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import Header from "./Header";

type DevTreeProps = {
    data: User;
};

function DevTree({ data }: DevTreeProps) {
    const activeLinks = JSON.parse(data.links).filter(
        (link: SocialNetwork) => link.enabled
    );

    const [enabledLinks, setEnabledLinks] =
        useState<SocialNetwork[]>(activeLinks);

    useEffect(() => {
        setEnabledLinks(activeLinks);
    }, [data]);

    const queryClient = useQueryClient();
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(
                (link) => link.id === active.id
            );
            const newIndex = enabledLinks.findIndex(
                (link) => link.id === over.id
            );

            const order = arrayMove(enabledLinks, prevIndex, newIndex);
            setEnabledLinks(order);

            const disabledLinks: SocialNetwork[] = JSON.parse(
                data.links
            ).filter((link: SocialNetwork) => !link.enabled);

            const links = [...order, ...disabledLinks];

            queryClient.setQueryData(["user"], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links),
                };
            });
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Visitar Mi Perfil /{data.handle}
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">
                                {data.handle}
                            </p>
                            {data.image && (
                                <img
                                    className="mx-auto max-w-[250px]"
                                    src={data.image}
                                    alt={`imagen de perfil de ${data.handle}`}
                                />
                            )}
                            <p className="text-center text-lg font-black text-white">
                                {data.description}
                            </p>

                            <DndContext
                                onDragEnd={handleDragEnd}
                                collisionDetection={closestCenter}
                            >
                                <div className="mt-10 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLinks.map(
                                            (link: SocialNetwork) => (
                                                <DevTreeLink
                                                    key={link.name}
                                                    link={link}
                                                />
                                            )
                                        )}
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster richColors />
        </>
    );
}

export default DevTree;
