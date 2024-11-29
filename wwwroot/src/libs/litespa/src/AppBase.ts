import { IOC } from "./IOC.js";
import { KVP } from "./KVP.js";
import { RouterBase } from "./RouterBase.js";
import "./react/customComponentsFix.js";
import "./react/jsx-runtime.js";

export abstract class AppBase extends HTMLElement {
    protected router: RouterBase;
    public constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.router = IOC.Container.Get(RouterBase);
        this.AppRouting();

        window.addEventListener("hashchange", e => {
            this.router.Route(location.hash);
        });

        this.LoadViews().then(() => {
            console.log("App running");
        });

    }
    protected lastView: string;
    public renderView(viewName: string, params = new Array<KVP>(), noReRender = false) {
        if (viewName === this.lastView && noReRender) {
            let main = this.shadowRoot.getElementById("spaBody") as HTMLMediaElement;
            const view = main.children[0];
            view.setAttribute("firstRender", "false");
            params.forEach(n => {
                view.setAttribute(n.Name, n.Value);
            });
            return;
        }

        this.lastView = viewName;

        let main = this.getAppBody();

        main.innerHTML = "";

        const view = document.createElement(viewName);
        view.setAttribute("firstRender", "true");
        params.forEach(n => {
            view.setAttribute(n.Name, n.Value);
        });


        main.appendChild(view);
    }

    public abstract getAppBody(): HTMLElement;

    public abstract LoadViews(): Promise<void>;
    public abstract AppRouting(): void;
}
