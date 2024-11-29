import { ReactElement } from "react";

export function ToElement(element: ReactElement) {
    return <HTMLElement><unknown>element;
}