import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { SocialNetwork } from "../types";

type DevTreeLinkProps = {
    link: SocialNetwork;
};

function DevTreeLink({ link }: DevTreeLinkProps) {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li style={style} {...attributes} {...listeners} ref={setNodeRef} className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
            <div
                className="size-12 bg-cover"
                style={{
                    backgroundImage: `url(/social/icon_${link.name}.svg)`,
                }}
            ></div>
            <p className="capitalize">
                Sígueme en: <span className="font-bold">{link.name}</span>
            </p>
        </li>
    );
}

export default DevTreeLink;
