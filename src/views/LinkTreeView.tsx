import { useState } from "react";
import { social } from "../data/social.ts";
import DevTreeInput from "../components/DevTreeInput.tsx";
import { DevTreeLink } from "../types/index.ts";

function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social);

    const handleEnableLink = (name: DevTreeLink["name"]) => {
        setDevTreeLinks(
            devTreeLinks.map((item) =>
                item.name === name ? { ...item, enabled: !item.enabled } : item
            )
        );
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
            </div>
        </>
    );
}

export default LinkTreeView;
