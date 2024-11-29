import { AbsCtr, Ctr } from "./AbsCtr.js";

export class IOC {
    private constructor() { }
    public static Container = new IOC();
    private stuff = new Map();
    public Register<T, V extends T>(absCtr: AbsCtr<T>, ctr: Ctr<V>) {

        if (this.stuff.has(absCtr.name)) {
            return;
        }

        const instance = new ctr();
        this.stuff.set(absCtr.name, instance);
    }
    public RegisterInstance<T, V extends T>(absCtr: AbsCtr<T>, instance: V) {

        if (this.stuff.has(absCtr.name)) {
            return;
        }

        this.stuff.set(absCtr.name, instance);
    }


    public Get<T, V extends T>(ctr: AbsCtr<T>): V {
        return this.stuff.get(ctr.name);
    }
}