import { KVP } from "./KVP";

export abstract class RouterBase {
    public abstract Route(newHash: string): void;
    public abstract RegisterPath(format: string, action: (...params: KVP[]) => void);
    public abstract RegisterSimplePath(format: string, action: () => void);
}