import { Switch } from "@headlessui/react";
import { DevTreeLink } from "../types";
import { classNames } from "../utils";

export type devTreeInputProps = {
    item: DevTreeLink;
    handleEnableLink: (name: DevTreeLink["name"]) => void;
    handleUrlChange: (
        name: DevTreeLink["name"],
        url: DevTreeLink["url"]
    ) => void;
};

function DevTreeInput({
    item,
    handleEnableLink,
    handleUrlChange,
}: devTreeInputProps) {
    return (
        <>
            <div className="bg-white shadow-sm p-5 flex items-center gap-3">
                <div
                    className="size-12 bg-cover"
                    style={{
                        backgroundImage: `url(/social/icon_${item.name}.svg)`,
                    }}
                ></div>
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg"
                    value={item.url}
                    onChange={(e) => handleUrlChange(item.name, e.target.value)}
                />
                <Switch
                    checked={item.enabled}
                    onChange={() => handleEnableLink(item.name)}
                    className={classNames(
                        item.enabled ? "bg-blue-500" : "bg-gray-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            item.enabled ? "translate-x-5" : "translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                    />
                </Switch>
            </div>
        </>
    );
}

export default DevTreeInput;
