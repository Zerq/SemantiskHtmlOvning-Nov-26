import { AbsCtr, Ctr } from "./AbsCtr.js";
import { IOC } from "./IOC.js";


export function DeclareService<T, V extends T>(absCtr: AbsCtr<V>) {
    return (ctr: Ctr<V>) => {
        IOC.Container.Register(absCtr, ctr);
    };
}
