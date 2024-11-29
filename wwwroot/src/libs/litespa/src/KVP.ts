export class KVP extends Object {
    public constructor(public Name: string, public Value: string) {
        super();
    }

    public Type: "string" | "number" | "boolean";

    public override toString() {
        return this.Value.toString();
    }
}