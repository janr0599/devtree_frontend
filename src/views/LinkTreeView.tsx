import { useState } from "react";
import { social } from "../data/social.ts";
import DevTreeInput from "../components/DevTreeInput.tsx";
import { DevTreeLink, User } from "../types/index.ts";
import { isValidUrl } from "../utils/index.ts";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSocialLinks } from "../api/DevTreeApi.ts";

function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social);

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(["user"])!;

    const { mutate } = useMutation({
        mutationFn: uploadSocialLinks,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (message: string) => {
            toast.success(message);
        },
    });

    const handleEnableLink = (name: DevTreeLink["name"]) => {
        const updatedLinks = devTreeLinks.map((item) => {
            if (item.name === name) {
                if (isValidUrl(item.url)) {
                    return { ...item, enabled: !item.enabled };
                } else {
                    toast.error("URL no válida");
                }
            }
            return item;
        });
        setDevTreeLinks(updatedLinks);
        queryClient.setQueryData(["user"], (prevData: User) => {
            return { ...prevData, links: JSON.stringify(updatedLinks) };
        });
    };

    const handleUrlChange = (
        name: DevTreeLink["name"],
        url: DevTreeLink["url"]
    ) => {
        setDevTreeLinks(
            devTreeLinks.map((item) =>
                item.name === name ? { ...item, url: url } : item
            )
        );
    };

    return (
        <>
            <div className="space-y-5">
                {devTreeLinks.map((item) => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleEnableLink={handleEnableLink}
                        handleUrlChange={handleUrlChange}
                    />
                ))}
                <button
                    className="bg-cyan-300 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                    onClick={() => mutate(user.links!)}
                >
                    Guardar Cambios
                </button>
            </div>
        </>
    );
}

export default LinkTreeView;
