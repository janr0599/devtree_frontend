import DevTreeLink from "./DevTreeLink";
import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
    data: UserHandle;
};

function HandleData({ data }: HandleDataProps) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter(
        (link: SocialNetwork) => link.enabled
    );

    return (
        <div className="space-y-6 text-white">
            <p className="text-4xl text-center font-bold">{data.handle}</p>
            {data.image && (
                <img
                    src={data.image}
                    alt={`imagen de perfil de ${data.handle}`}
                    className="max-w-[250px] mx-auto"
                />
            )}
            <p className="text-lg text-center">{data.description}</p>
            {links.length ? (
                links.map((link: SocialNetwork) => (
                    <a
                        href={link.url}
                        target="_blank"
                        key={link.name}
                        className="block"
                    >
                        <DevTreeLink link={link} />
                    </a>
                ))
            ) : (
                <p className="text-lg text-center">
                    No hay enlaces en este perfil
                </p>
            )}
        </div>
    );
}

export default HandleData;
