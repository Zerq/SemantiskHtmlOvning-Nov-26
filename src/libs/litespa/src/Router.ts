import { IOC } from "./IOC.js";
import { KVP } from "./KVP.js";
import { getFunctionParams } from "./getFunctionParams.js";
import { RouterBase } from "./RouterBase.js";

type VoidFunc = () => void;

export class Router extends RouterBase {

    public static InitializeService(){
        IOC.Container.Register(RouterBase, Router);
    }

    public Route(newHash: string): void {
        const x = this.EvaluateRoute(newHash);
        x?.();
    }

    public EvaluateRoute(hash: string): VoidFunc | null {
        if (hash === "" || hash === "#") {
            const home = this.routes.find(n => n.rawFormat == "#home");
            if (home) {
                return () => home.action();
            }

            return null;
        }
        let result: VoidFunc | null = null;
        for (let i = 0; i < this.routes.length; i++) {

            let rex = new RegExp(this.routes[i].regex);
            let matches = rex.exec(hash);

            if (!matches) {
                continue;
            }

            let populatedParams = new Array<KVP>();
            let funcParams = getFunctionParams(this.routes[i].action);
            
            matches.shift();

            matches.forEach((match, key) => {
                let value = match;
                let name = funcParams[key];
                populatedParams.push(new KVP(name, value));
            });          

            if (populatedParams) {
                result = () => { this.routes[i].action(...populatedParams); };
                break;
            }
        }
        return result;
    }

    public makeRegexString(inputFormat: string, ...params: string[]) {
        let format = inputFormat.toString();
        params.forEach((param, i) => {

            if (!param.toString().startsWith("{")) {
                param = `{${param}}`;
            }

            let end = format.indexOf(param.toString()) + param.toString().length;
            let separator = format.substring(end, end + 1);

            if (separator === "") {
                format = format.replace(param.toString(), `(.*)`); //last item probably 
            } else {
                format = format.replace(param.toString(), `([^${separator}]*)`);
            }
        });
        return format.replaceAll("/", "\\/");
    }

    public ParseParams(inputFormat: string, hash: string, ...params: string[]): KVP[] {
        let rex = RegExp(this.makeRegexString(inputFormat, ...params));
        const matches = rex.exec(hash);

        if (!matches) {
            return [];
        }

        let result = new Array<KVP>();
        matches.forEach((match, i) => {
            let key = params[i];
            let value = match;
            result.push(new KVP(key,value));
        });
        return result;
    }

    public RegisterPath(format: string, action: Function) {
        const index = this.routes.findIndex(n => n.rawFormat === format);

        if (index === -1) {
            this.routes.push({
                rawFormat: format,
                action: action,
                regex: this.makeRegexString(format, ...getFunctionParams(action))
            });
        } else {
            this.routes[index] = {
                rawFormat: format,
                action: action,
                regex: this.makeRegexString(format, ...getFunctionParams(action))
            };
        }
    }

    public RegisterSimplePath(format: string, action: () => void) {
        const index = this.routes.findIndex(n => n.rawFormat === format);

        if (index === -1) {
            this.routes.push({
                rawFormat: format,
                action: action,
                regex: format
            });
        } else {
            this.routes[index] = {
                rawFormat: format,
                action: action,
                regex: format
            };
        }
    }
    protected routes: Array<{ rawFormat: string, regex: string, action: Function }> = [];
}