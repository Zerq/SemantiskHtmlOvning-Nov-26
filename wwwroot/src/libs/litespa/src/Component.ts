import { Ctr } from "./AbsCtr.js";

export function Component<T extends HTMLElement>(name: string) {
    return (ctor: Ctr<T>) => {
        customElements.define(name, ctor);
    };
}
