import { ReactElement } from "react";
import React from "react";
import "./libs/litespa/src/react/customComponentsFix.js";
import "./libs/litespa/src/react/jsx-runtime.js";


function CastElement(src: ReactElement): HTMLElement {
    return (src as unknown) as HTMLElement;
}


type Project = { name: string, body: ReactElement, footer: ReactElement };


function getChildren(node: Article, all: Array<Article>) {
    const result = all.filter(n => node === n.parent);
    return result;
}

function RenderNodes(nodes: Array<Article>, all: Array<Article>): ReactElement {
    if (nodes.length > 0) {
        return <ul>{nodes.map(n => RenderNode(n, all))}</ul>;
    }
    return <span> </span>;
}

function RenderNode(node: Article, all: Array<Article>) {

    if (node.id === null) {

        let children = getChildren(node, all);



        return <li>
            <span>{node.name}</span>
            {RenderNodes(children, all)}
        </li>
    } else {

        let children = getChildren(node, all);

        return <li>
            <span><a href={"#" + node.id}>{node.name}</a></span>
            {RenderNodes(children, all)}
        </li>
    }
}


export class Article {
    public constructor(public name: string, public id: string | null, public parent: Article | null) {
        if (id !== null) {
            this.header = <header><h2>{name}</h2></header>;
        }
    }

    private header?: ReactElement;
    private body?: ReactElement;
    private footer?: ReactElement;
    public collect(list: Array<Article>) {
        list.push(this);
        return this;
    }

    public Header(content: ReactElement): Article {

        this.header = content;

        return this
    }

    public Body(content: ReactElement): Article {

        this.body = content;

        return this
    }

    public Projects(projects: Array<Project>): Article {
        this.body = <div>
            {projects.map(proj => <section>
                <header><h3>{proj.name}</h3></header>
                {proj.body}
                <footer>
                    {proj.footer}
                </footer>
            </section>)}
        </div>;
        return this
    }

    public Footer(content: ReactElement): Article {

        this.footer = content;

        return this
    }

    Render() {
        return <article>
            {this.header}
            {this.body}
            {this.footer ? this.footer : ""}
        </article>;
    }
}

export class App {
    public async Run() {
        const all = Array<Article>();

        const Crafting = new Article("Crafting", null, null).collect(all);

        const Programming = new Article("Programming", null, Crafting).collect(all);

        const DotNet = new Article("DotNet", "DotNet", Programming).Projects([
            {
                name: "Omnicatz announce",
                body: <p>Basically wanna package a webgui that generates TTS messages with chim in and out noices and interups a music playlist fading out and pausing it to play the message before returning to the playlist.</p>,
                footer: <span>(not currently published as of yet... got the mp3 generation sorted out but pretty early into this one...)</span>
            },
            {
                name: "Epub2Mp3",
                body: <p>comicbook reader uses format like cbr and cbz (rar and zip based) inside its just numbered immages... <br /> <br /> My idea is to stick scripted html and a text transcript of the speech bubbles and have TTS.</p>,
                footer: <span>(not currently public... i really need to clean this one up a bit had handle variations in epub formating currently i am just kinda manually altering the source at need to compensate which works for me but is not a generally good solution...)</span>
            },
            {
                name: "Animated comicbook Speechreader",
                body: <p>A set of terminal tools for converting a ebook in epub format into a set of mp3s though i also have plans for a more structured capable format and player...</p>, footer: <span> (I've sort of started and given up on this one a few times... initially because of issue debugging the embeded browser component i was using.. i know how too do that now so i expect more progress next time i get around to this... but to make it viable i need some kind of editor for it too...)</span>
            },

        ]).collect(all);

        const Typescript = new Article("Typescript", "Typescript", Programming).Projects([
            {
                name: "LiteSPA",
                body: <div><p>This is my own spa framework using only the build in esm module
                    loader and typescript with mainly build side npm refernces only and some
                    post transpilation modification steps to enable TSX template support...</p>
                    <p>It also has a custom written router and currently uses webcomponents
                        though i am looking at replacing those.</p>
                    <p>I also need to write a better IOC container halfway thinking of adding a post transpilation
                        processing step to grab the interface names and relationships into a metadata file or
                        something...
                        i might be doing a metadata layer thingy for exporting dotnet class info into javascript
                        anyway...
                    </p>
                    <p>That and i am half way wondering if i coudl transfer property getter setter logic too using
                        webassembly...
                        <br />
                        But that is kind of a crazy idea.
                    </p></div>,
                footer: <a href="https://github.com/Zerq/LiteSPA">LiteSPA</a>
            }

        ]).collect(all);

        const GameDevelopment = new Article("Game Development", "GameDevelopment", Programming).Projects([
            {
                name: "LiteSPA",
                body: <div><p>This is my own spa framework using only the build in esm module
                    loader and typescript with mainly build side npm refernces only and some
                    post transpilation modification steps to enable TSX template support...</p>
                    <p>It also has a custom written router and currently uses webcomponents
                        though i am looking at replacing those.</p>
                    <p>I also need to write a better IOC container halfway thinking of adding a post transpilation
                        processing step to grab the interface names and relationships into a metadata file or
                        something...
                        i might be doing a metadata layer thingy for exporting dotnet class info into javascript
                        anyway...
                    </p>
                    <p>That and i am half way wondering if i coudl transfer property getter setter logic too using
                        webassembly...
                        <br />
                        But that is kind of a crazy idea.
                    </p></div>,
                footer: <a href="https://github.com/Zerq/LiteSPA">LiteSPA</a>
            }
        ]).collect(all);

        const Blacksmithing = new Article("Blacksmithing and welding", "Blacksmithing", Crafting).Body(<p>
            I some stick welding, i've tried Tig welding and plasma cutting but ran out of consumables for my welder for that and its to finiky anyway... Stick does most what i want.<br />
            I also do some hobbyist blacksmithing though i have not done a whole lot... i can also do some light sheet metal work.<br />
            I wanna get into metal casting too if i can especially if i can do it from 3d printed models.
        </p>).collect(all);

        const Leathercrafting = new Article("Leathercrafting", "Leathercrafting", Crafting).Body(<p>
            I do some leather crafting most odd bits and bobs and i use it as a easy source of lacer cuttible replacement for metal hinges when i make laser cut wooden chests.<br />
            Leather is useful stuff.. but i dislike the grimy sut it makes that then get caught in the cooling fan for the laser diode module...
        </p>).collect(all);

        const Lasercutting = new Article("Lasercutting", "Lasercutting", Crafting).Body(<p>
            I own a laser cutter that can work something 400x300mm pieces wood, leather and acrylic.
            i've done chess boards, wooden chests, i am experimenting with making musical instruments and mouting plates for Raspberry Pi's to go into a ATX case.
        </p>).collect(all);

        const Printing3d = new Article("3d Printing", "3dPrinting", Crafting).Body(<p>
            I 3d print a lot of things... well when my 3d printers are not broken or jammed and i am to shit
            lazy to fix them.<br />
            before i've done things like tripods and repairs to tools and even tried making a lathe... not
            practical by my methods though someone did try it but with concreet as a filler which looks
            interesting..
            i've done something similar when i plaster filled a dumbel 3d printed...<br /><br />

            other then that i've done containers and paint bottle trays etc... all useful
            stuff..<br /><br />

            Hell i even made weaving supplies for my mom.
        </p>).collect(all);

        const MNWSE = new Article("Mildly Non-worksafe Embroidery", "MNWSE", Crafting).Body(<p>
            It's a hobby... but since it is mildly non-worksafe it will not be depicted or described here :P
            <br /><br />
            And if i am gonna do embroidery i should put some kind of spin on it XD
            <br /><br />
            (the contraryan in me demands it!!)
        </p>).collect(all);

        const Drawing = new Article("Drawing", "drawing", Crafting).Body(<p>
            I've studied art somewhat and it something i do from time to time but maybe not as extensivly as
            in
            the past.<br />
            usually its judy doodles tanks, giant, robots scantily clad catgirl etc... <br />
            <br />
            But i also draw practical things like design i later 3d print or laser cut or otherwise build..
            wireframes for layout etc etc..<br />
            <br />
            Art has always been an interest and i have used an array of diffrent techniques generally but
            mostly
            i draw...<br />
            mostly in a anime style. <br />
            I am not very efficent about it though and will spend way to much time on a single work if i go
            all
            the way and decide to digitally outline color and shade it. <br />
            Also i am horribly inconsistent in style partly from changing my technique around and choice of
            art
            supplies used. <br />
            one day i may be using pro markrs and fiber pens... then next maybe i am experimenting with some
            odd
            combination of tipex and fiber pens or i am using in pens
            or just a mechanical pencel and thin mechanicaly feeding eraser and then scanning and outlining
            digitally.. <br /> or turning it into a SVG even. <br />
            <br />
            As of late i have mostly been working directly in boxy3d doing svg designs.<br />
            <br />
            I've done some logo design but my nepew is probably still a bit better at that sort of thing.
        </p>).collect(all);

        const Cad = new Article("3d Modeling and CAD", "cad", Crafting).Body(<p>
            I started out in the 90ties with Bryce 3d and poser which i got free older version of from a
            computer magazine which was a thing back then.<br />
            Later i taught my self 3d studio max though badly... <br />
            Then i studied 3d and was actually taugh maya which frankly i cant excuse paying for so tha
            skillset
            has mostly degraded by now...<br />
            But i did master sketchup which i use the 2017 make version of to this day using Wine in linux.
            (i
            recently finally got the thing to update visually consistently yay!)<br />
            <br />
            I use it for all my 3d priting and laser cutting project but the drawback here is its not good
            for
            rounded elements so my 3d work has gone in a very engenerring directed direction where i mostly
            build functional pieces.<br />
            <br />
            Today i will happily employ both techniques in tandem.
        </p>).collect(all);

        const Electronics = new Article("Electronics", "Electronics", Crafting).Body(<p>
            This is one of my weaker skills i do some very very basic arduino stuff and can solder and know my way around ohms law but that is about it.<br /><br />
            Now for computer hardware that i am a lot better with and i have built an extensive number of computers over the years both intel and AMD even a suit case PC and i have been working on a wearable computer.
        </p>).collect(all);

        const Music = new Article("Music", "Music", Crafting).Body(<div>
            <p>I do like playing any kind of keyed instrument generally speaking... <br />
                though i can only reallypick out a melody so not really skilled its more something i aspired to..<br />
                <br />
                I also like tinkering in FL studio...<br />
                Currently my instrument/equipment collection includes
            </p>
            <ul>
                <li>A nerdy gurdy (a laser cut hurdy gurdy),</li>
                <li>Melodica</li>
                <li>Casiotone CT-S300 keyboard</li>
                <li>Arturia Microbrude analog syntesizer</li>
                <li>Korg NST-1 digital</li>
                <li>A very basic Bass (which i suck at playing!)</li>
                <li>A roland sound cube</li>
                <li>I also have a blasted little sound interface that i am trying to get to run in linux.</li>
                <li>Roland Sound Canvas 66 which</li>
                <li>Xylophone (with some bits missing)</li>
                <li>a punshcard operated music box</li>
            </ul>
            <p>
                I am also partial to tinkering with VCV (a very fun free digital euro rack simulator)
            </p>
        </div>).collect(all);

        const Warhammer40k = new Article("Warhammer 40k", "warhammer40k", Crafting).Body(
            <div>
                <p>I've played several armies and enjoyed kitbashing and even modeling and 3d printing my own original models... <br />
                    The painting i am not so good at comparativly...<br />
                    i've collected the following armies
                </p>
                <ul>
                    <li>Inquisition</li>
                    <li>Sister Of Battle</li>
                    <li>Imperial Guard (Cadian, Catachan, Tanith ghosts)</li>
                    <li>Space marines (blood angels/Angrymarine)</li>
                    <li>Orks</li>
                </ul>
            </div>).collect(all);

        const Linux = new Article("Linux", "Linux", Crafting).Body(
            <p>
                I fleed vista for ubuntu.<br />
                Now i flee win11 and that horrid recall malware and execive telemetry that package with it i doubt i will ever willingly return to windows for my own use.<br />
                I am rather happy with Linux mint(Cinnamon) thus far but i may be doing some distro hopping if i get another drive and give some other distros a try.. probably something with KDE plasma...<br />
                at some point maybe even try arch...
            </p>).collect(all);

        const Media = new Article("Media", null, null).collect(all);
        const Literature = new Article("Literature", null, Media).collect(all);
        const Writing = new Article("Writing", "Writing", Literature).Body(<p>I rather enjoy writing poetry and i do from time to time tinker with writing stories...
            <br /> Though i get Fairlyfar in world building i rarely get very far on actually writing anything other then an
            general story outline.<br /><br />
            now as for poetry there i have some achivments...<br />
            <br />
            I have for instance a rather long super villain poem that is meant to follow a narrative
            involving a love triangle and time travel....<br />.<br />
            <br />
            I also wrote a poem that doubles a skyrim build guide and exploit guide for a stealth archer
            build / unstopable necromancer.</p>).collect(all);

        const Reading = new Article("Reading", "Reading", Literature).Body(<p>My Kindle book collection stands at 1925 books<br />666 audio books (NUMBER OF THE BEAST LOL!)
            <br /><br />my J-novel list stands att 208 light novels.
            <br /><br />and i also get a few things from smashwords...<br />Plus before i even got kindle i read though lord of the rings and the whole discworld series.</p>).collect(all);

        const Anime = new Article("Anime", "Anime", Media).Body(<p>you know...  isenkai flavour of the month... also like light novels.<br />
            Used to attend anime conventions and even be involved in arranging them.</p>).collect(all);

        const favMovie = new Article("Favorit Movies", "favMovie", Media).Body(<ul>
            <li>UHF</li>
            <li>The Adventures of Baron Munchausen</li>
            <li>Flash Gordon</li>
            <li>journey to the center of the earth (1959)</li>
        </ul>).collect(all);

        const CulinaryInterests = new Article("Culinary Interests", null, null).collect(all);
        const Cooking = new Article("Cooking", null, CulinaryInterests).collect(all);
        const Baking = new Article("Baking", null, CulinaryInterests).collect(all);
        const CocktailMaking = new Article("Cocktail making", null, CulinaryInterests).collect(all);
        const CandyMaking = new Article("Candy making", null, CulinaryInterests).collect(all);





        //note that class name is turned to class
        const body = CastElement(<div className="outerWrapper">
            <header>
                <h1>I HAVE TO MANY F&#65533;&#65533;&#65533;ING HOBBIES!</h1>
                <p className="crazyProclamation">I AM A CHILD OF THE 90ties you cannot deny me text-decoration: blink!<br />
                    (Technically also of the 80ties though i rember bugger all of that....)</p>
            </header>
            <div className="wrapper">
                <nav>
                    <ul>
                        {RenderNode(Crafting, all)}
                        {RenderNode(Media, all)}
                        {RenderNode(CulinaryInterests, all)}
                    </ul>
                </nav>
                <main>
                    <summary>
                        <h2>Summary</h2>
                        <p>I have way to many interests... i am creative chaos incarnate...<br /><br />
                            My hobby is having hobbies.
                        </p>
                    </summary>
                    {DotNet.Render()}
                    {Typescript.Render()}
                    {GameDevelopment.Render()}
                    {Blacksmithing.Render()}
                    {Leathercrafting.Render()}
                    {Lasercutting.Render()}
                    {Printing3d.Render()}
                    {MNWSE.Render()}
                    {Drawing.Render()}
                    {Cad.Render()}
                    {Electronics.Render()}
                    {Music.Render()}
                    {Warhammer40k.Render()}
                    {Linux.Render()}
                    {Writing.Render()}
                    {Reading.Render()}
                    {Anime.Render()}
                    {favMovie.Render()}
                </main>
                <aside>
                    <h2>Gallery</h2>
                    <img className="limitWidth" src="./assets/images/chess1.png"
                        alt="a picture of a cad design for a laser cuttable chessboard set" />
                    <img className="limitWidth" src="./assets/images/dyptych.png"
                        alt="a picture dyptych (wax tablet) and a hand holding a bronze stylus resting on top of a cassiotone ct-s300 keyboard for some reason." />
                    <img className="limitWidth" src="./assets/images/dyptych2.png"
                        alt="a picture of the back side of a dyptych(wax tablet) depicting an arched window a rose on one side and a rabbit knight on a lion and a sun" />
                    <img className="limitWidth" src="./assets/images/lasercut3dprint.jpg"
                        alt="A picture of a hopper built of 3d cut wood and joined together with 3d printed plastic brackets" />
                    <img className="limitWidth" src="./assets/images/Linux.png"
                        alt="a screen shoot of a heavily modified linux desktop made to look a bit more windows like but with the windows logo replaced by the adeptus machanicus logo and with a adeptus sororitas wallpaper" />
                    <img className="limitWidth" src="./assets/images/tripod.png"
                        alt="a picture of a home made 3d printed tripod utilizing electrical pvc pipes" />
                    <img className="limitWidth" src="./assets/images/chess2.jpg"
                        alt="a picture of a laser cut chess set but without the wood stain applied" />
                    <img className="limitWidth" src="./assets/images/redot.png"
                        alt="a picture of a 3d printed home made reddot sight made with glass from old slide projector frames." />
                </aside>
            </div>

            <footer>
                &copy; Omnicatz 2024
            </footer>
        </div>);

        document.body.appendChild(body);

    }
}