import { DevTreeLink } from "../types";

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function isValidUrl(url: DevTreeLink["url"]) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
