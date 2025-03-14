import { SocialNetwork } from "../types";

type DevTreeLinkProps = {
    link: SocialNetwork;
};

function DevTreeLink({ link }: DevTreeLinkProps) {
    return (
        <li className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
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
