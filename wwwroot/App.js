import { jsx as _jsx, jsxs as _jsxs } from "./libs/litespa/src/react/jsx-runtime.js";
import "./libs/litespa/src/react/customComponentsFix.js";
import "./libs/litespa/src/react/jsx-runtime.js";
function CastElement(src) {
    return src;
}
function getChildren(node, all) {
    const result = all.filter(n => node === n.parent);
    return result;
}
function RenderNodes(nodes, all) {
    if (nodes.length > 0) {
        return _jsx("ul", { children: nodes.map(n => RenderNode(n, all)) });
    }
    return _jsx("span", { children: " " });
}
function RenderNode(node, all) {
    if (node.id === null) {
        let children = getChildren(node, all);
        return _jsxs("li", { children: [_jsx("span", { children: node.name }), RenderNodes(children, all)] });
    }
    else {
        let children = getChildren(node, all);
        return _jsxs("li", { children: [_jsx("span", { children: _jsx("a", { href: "#" + node.id, children: node.name }) }), RenderNodes(children, all)] });
    }
}
export class Article {
    name;
    id;
    parent;
    constructor(name, id, parent) {
        this.name = name;
        this.id = id;
        this.parent = parent;
        if (id !== null) {
            this.header = _jsx("header", { children: _jsx("h2", { children: name }) });
        }
    }
    header;
    body;
    footer;
    collect(list) {
        list.push(this);
        return this;
    }
    Header(content) {
        this.header = content;
        return this;
    }
    Body(content) {
        this.body = content;
        return this;
    }
    Projects(projects) {
        this.body = _jsx("div", { children: projects.map(proj => _jsxs("section", { children: [_jsx("header", { children: _jsx("h3", { children: proj.name }) }), proj.body, _jsx("footer", { children: proj.footer })] })) });
        return this;
    }
    Footer(content) {
        this.footer = content;
        return this;
    }
    Render() {
        return _jsxs("article", { children: [this.header, this.body, this.footer ? this.footer : ""] });
    }
}
export class App {
    async Run() {
        const all = Array();
        const Crafting = new Article("Crafting", null, null).collect(all);
        const Programming = new Article("Programming", null, Crafting).collect(all);
        const DotNet = new Article("DotNet", "DotNet", Programming).Projects([
            {
                name: "Omnicatz announce",
                body: _jsx("p", { children: "Basically wanna package a webgui that generates TTS messages with chim in and out noices and interups a music playlist fading out and pausing it to play the message before returning to the playlist." }),
                footer: _jsx("span", { children: "(not currently published as of yet... got the mp3 generation sorted out but pretty early into this one...)" })
            },
            {
                name: "Epub2Mp3",
                body: _jsxs("p", { children: ["comicbook reader uses format like cbr and cbz (rar and zip based) inside its just numbered immages... ", _jsx("br", {}), " ", _jsx("br", {}), " My idea is to stick scripted html and a text transcript of the speech bubbles and have TTS."] }),
                footer: _jsx("span", { children: "(not currently public... i really need to clean this one up a bit had handle variations in epub formating currently i am just kinda manually altering the source at need to compensate which works for me but is not a generally good solution...)" })
            },
            {
                name: "Animated comicbook Speechreader",
                body: _jsx("p", { children: "A set of terminal tools for converting a ebook in epub format into a set of mp3s though i also have plans for a more structured capable format and player..." }), footer: _jsx("span", { children: " (I've sort of started and given up on this one a few times... initially because of issue debugging the embeded browser component i was using.. i know how too do that now so i expect more progress next time i get around to this... but to make it viable i need some kind of editor for it too...)" })
            },
        ]).collect(all);
        const Typescript = new Article("Typescript", "Typescript", Programming).Projects([
            {
                name: "LiteSPA",
                body: _jsxs("div", { children: [_jsx("p", { children: "This is my own spa framework using only the build in esm module loader and typescript with mainly build side npm refernces only and some post transpilation modification steps to enable TSX template support..." }), _jsx("p", { children: "It also has a custom written router and currently uses webcomponents though i am looking at replacing those." }), _jsx("p", { children: "I also need to write a better IOC container halfway thinking of adding a post transpilation processing step to grab the interface names and relationships into a metadata file or something... i might be doing a metadata layer thingy for exporting dotnet class info into javascript anyway..." }), _jsxs("p", { children: ["That and i am half way wondering if i coudl transfer property getter setter logic too using webassembly...", _jsx("br", {}), "But that is kind of a crazy idea."] })] }),
                footer: _jsx("a", { href: "https://github.com/Zerq/LiteSPA", children: "LiteSPA" })
            }
        ]).collect(all);
        const GameDevelopment = new Article("Game Development", "GameDevelopment", Programming).Projects([
            {
                name: "LiteSPA",
                body: _jsxs("div", { children: [_jsx("p", { children: "This is my own spa framework using only the build in esm module loader and typescript with mainly build side npm refernces only and some post transpilation modification steps to enable TSX template support..." }), _jsx("p", { children: "It also has a custom written router and currently uses webcomponents though i am looking at replacing those." }), _jsx("p", { children: "I also need to write a better IOC container halfway thinking of adding a post transpilation processing step to grab the interface names and relationships into a metadata file or something... i might be doing a metadata layer thingy for exporting dotnet class info into javascript anyway..." }), _jsxs("p", { children: ["That and i am half way wondering if i coudl transfer property getter setter logic too using webassembly...", _jsx("br", {}), "But that is kind of a crazy idea."] })] }),
                footer: _jsx("a", { href: "https://github.com/Zerq/LiteSPA", children: "LiteSPA" })
            }
        ]).collect(all);
        const Blacksmithing = new Article("Blacksmithing and welding", "Blacksmithing", Crafting).Body(_jsxs("p", { children: ["I some stick welding, i've tried Tig welding and plasma cutting but ran out of consumables for my welder for that and its to finiky anyway... Stick does most what i want.", _jsx("br", {}), "I also do some hobbyist blacksmithing though i have not done a whole lot... i can also do some light sheet metal work.", _jsx("br", {}), "I wanna get into metal casting too if i can especially if i can do it from 3d printed models."] })).collect(all);
        const Leathercrafting = new Article("Leathercrafting", "Leathercrafting", Crafting).Body(_jsxs("p", { children: ["I do some leather crafting most odd bits and bobs and i use it as a easy source of lacer cuttible replacement for metal hinges when i make laser cut wooden chests.", _jsx("br", {}), "Leather is useful stuff.. but i dislike the grimy sut it makes that then get caught in the cooling fan for the laser diode module..."] })).collect(all);
        const Lasercutting = new Article("Lasercutting", "Lasercutting", Crafting).Body(_jsx("p", { children: "I own a laser cutter that can work something 400x300mm pieces wood, leather and acrylic. i've done chess boards, wooden chests, i am experimenting with making musical instruments and mouting plates for Raspberry Pi's to go into a ATX case." })).collect(all);
        const Printing3d = new Article("3d Printing", "3dPrinting", Crafting).Body(_jsxs("p", { children: ["I 3d print a lot of things... well when my 3d printers are not broken or jammed and i am to shit lazy to fix them.", _jsx("br", {}), "before i've done things like tripods and repairs to tools and even tried making a lathe... not practical by my methods though someone did try it but with concreet as a filler which looks interesting.. i've done something similar when i plaster filled a dumbel 3d printed...", _jsx("br", {}), _jsx("br", {}), "other then that i've done containers and paint bottle trays etc... all useful stuff..", _jsx("br", {}), _jsx("br", {}), "Hell i even made weaving supplies for my mom."] })).collect(all);
        const MNWSE = new Article("Mildly Non-worksafe Embroidery", "MNWSE", Crafting).Body(_jsxs("p", { children: ["It's a hobby... but since it is mildly non-worksafe it will not be depicted or described here :P", _jsx("br", {}), _jsx("br", {}), "And if i am gonna do embroidery i should put some kind of spin on it XD", _jsx("br", {}), _jsx("br", {}), "(the contraryan in me demands it!!)"] })).collect(all);
        const Drawing = new Article("Drawing", "drawing", Crafting).Body(_jsxs("p", { children: ["I've studied art somewhat and it something i do from time to time but maybe not as extensivly as in the past.", _jsx("br", {}), "usually its judy doodles tanks, giant, robots scantily clad catgirl etc... ", _jsx("br", {}), _jsx("br", {}), "But i also draw practical things like design i later 3d print or laser cut or otherwise build.. wireframes for layout etc etc..", _jsx("br", {}), _jsx("br", {}), "Art has always been an interest and i have used an array of diffrent techniques generally but mostly i draw...", _jsx("br", {}), "mostly in a anime style. ", _jsx("br", {}), "I am not very efficent about it though and will spend way to much time on a single work if i go all the way and decide to digitally outline color and shade it. ", _jsx("br", {}), "Also i am horribly inconsistent in style partly from changing my technique around and choice of art supplies used. ", _jsx("br", {}), "one day i may be using pro markrs and fiber pens... then next maybe i am experimenting with some odd combination of tipex and fiber pens or i am using in pens or just a mechanical pencel and thin mechanicaly feeding eraser and then scanning and outlining digitally.. ", _jsx("br", {}), " or turning it into a SVG even. ", _jsx("br", {}), _jsx("br", {}), "As of late i have mostly been working directly in boxy3d doing svg designs.", _jsx("br", {}), _jsx("br", {}), "I've done some logo design but my nepew is probably still a bit better at that sort of thing."] })).collect(all);
        const Cad = new Article("3d Modeling and CAD", "cad", Crafting).Body(_jsxs("p", { children: ["I started out in the 90ties with Bryce 3d and poser which i got free older version of from a computer magazine which was a thing back then.", _jsx("br", {}), "Later i taught my self 3d studio max though badly... ", _jsx("br", {}), "Then i studied 3d and was actually taugh maya which frankly i cant excuse paying for so tha skillset has mostly degraded by now...", _jsx("br", {}), "But i did master sketchup which i use the 2017 make version of to this day using Wine in linux. (i recently finally got the thing to update visually consistently yay!)", _jsx("br", {}), _jsx("br", {}), "I use it for all my 3d priting and laser cutting project but the drawback here is its not good for rounded elements so my 3d work has gone in a very engenerring directed direction where i mostly build functional pieces.", _jsx("br", {}), _jsx("br", {}), "Today i will happily employ both techniques in tandem."] })).collect(all);
        const Electronics = new Article("Electronics", "Electronics", Crafting).Body(_jsxs("p", { children: ["This is one of my weaker skills i do some very very basic arduino stuff and can solder and know my way around ohms law but that is about it.", _jsx("br", {}), _jsx("br", {}), "Now for computer hardware that i am a lot better with and i have built an extensive number of computers over the years both intel and AMD even a suit case PC and i have been working on a wearable computer."] })).collect(all);
        const Music = new Article("Music", "Music", Crafting).Body(_jsxs("div", { children: [_jsxs("p", { children: ["I do like playing any kind of keyed instrument generally speaking... ", _jsx("br", {}), "though i can only reallypick out a melody so not really skilled its more something i aspired to..", _jsx("br", {}), _jsx("br", {}), "I also like tinkering in FL studio...", _jsx("br", {}), "Currently my instrument/equipment collection includes"] }), _jsxs("ul", { children: [_jsx("li", { children: "A nerdy gurdy (a laser cut hurdy gurdy)," }), _jsx("li", { children: "Melodica" }), _jsx("li", { children: "Casiotone CT-S300 keyboard" }), _jsx("li", { children: "Arturia Microbrude analog syntesizer" }), _jsx("li", { children: "Korg NST-1 digital" }), _jsx("li", { children: "A very basic Bass (which i suck at playing!)" }), _jsx("li", { children: "A roland sound cube" }), _jsx("li", { children: "I also have a blasted little sound interface that i am trying to get to run in linux." }), _jsx("li", { children: "Roland Sound Canvas 66 which" }), _jsx("li", { children: "Xylophone (with some bits missing)" }), _jsx("li", { children: "a punshcard operated music box" })] }), _jsx("p", { children: "I am also partial to tinkering with VCV (a very fun free digital euro rack simulator)" })] })).collect(all);
        const Warhammer40k = new Article("Warhammer 40k", "warhammer40k", Crafting).Body(_jsxs("div", { children: [_jsxs("p", { children: ["I've played several armies and enjoyed kitbashing and even modeling and 3d printing my own original models... ", _jsx("br", {}), "The painting i am not so good at comparativly...", _jsx("br", {}), "i've collected the following armies"] }), _jsxs("ul", { children: [_jsx("li", { children: "Inquisition" }), _jsx("li", { children: "Sister Of Battle" }), _jsx("li", { children: "Imperial Guard (Cadian, Catachan, Tanith ghosts)" }), _jsx("li", { children: "Space marines (blood angels/Angrymarine)" }), _jsx("li", { children: "Orks" })] })] })).collect(all);
        const Linux = new Article("Linux", "Linux", Crafting).Body(_jsxs("p", { children: ["I fleed vista for ubuntu.", _jsx("br", {}), "Now i flee win11 and that horrid recall malware and execive telemetry that package with it i doubt i will ever willingly return to windows for my own use.", _jsx("br", {}), "I am rather happy with Linux mint(Cinnamon) thus far but i may be doing some distro hopping if i get another drive and give some other distros a try.. probably something with KDE plasma...", _jsx("br", {}), "at some point maybe even try arch..."] })).collect(all);
        const Media = new Article("Media", null, null).collect(all);
        const Literature = new Article("Literature", null, Media).collect(all);
        const Writing = new Article("Writing", "Writing", Literature).Body(_jsxs("p", { children: ["I rather enjoy writing poetry and i do from time to time tinker with writing stories...", _jsx("br", {}), " Though i get Fairlyfar in world building i rarely get very far on actually writing anything other then an general story outline.", _jsx("br", {}), _jsx("br", {}), "now as for poetry there i have some achivments...", _jsx("br", {}), _jsx("br", {}), "I have for instance a rather long super villain poem that is meant to follow a narrative involving a love triangle and time travel....", _jsx("br", {}), ".", _jsx("br", {}), _jsx("br", {}), "I also wrote a poem that doubles a skyrim build guide and exploit guide for a stealth archer build / unstopable necromancer."] })).collect(all);
        const Reading = new Article("Reading", "Reading", Literature).Body(_jsxs("p", { children: ["My Kindle book collection stands at 1925 books", _jsx("br", {}), "666 audio books (NUMBER OF THE BEAST LOL!)", _jsx("br", {}), _jsx("br", {}), "my J-novel list stands att 208 light novels.", _jsx("br", {}), _jsx("br", {}), "and i also get a few things from smashwords...", _jsx("br", {}), "Plus before i even got kindle i read though lord of the rings and the whole discworld series."] })).collect(all);
        const Anime = new Article("Anime", "Anime", Media).Body(_jsxs("p", { children: ["you know...  isenkai flavour of the month... also like light novels.", _jsx("br", {}), "Used to attend anime conventions and even be involved in arranging them."] })).collect(all);
        const favMovie = new Article("Favorit Movies", "favMovie", Media).Body(_jsxs("ul", { children: [_jsx("li", { children: "UHF" }), _jsx("li", { children: "The Adventures of Baron Munchausen" }), _jsx("li", { children: "Flash Gordon" }), _jsx("li", { children: "journey to the center of the earth (1959)" })] })).collect(all);
        const CulinaryInterests = new Article("Culinary Interests", null, null).collect(all);
        const Cooking = new Article("Cooking", null, CulinaryInterests).collect(all);
        const Baking = new Article("Baking", null, CulinaryInterests).collect(all);
        const CocktailMaking = new Article("Cocktail making", null, CulinaryInterests).collect(all);
        const CandyMaking = new Article("Candy making", null, CulinaryInterests).collect(all);
        //note that class name is turned to class
        const body = CastElement(_jsxs("div", { class: "outerWrapper", children: [_jsxs("header", { children: [_jsx("h1", { children: "I HAVE TO MANY F\uFFFD\uFFFD\uFFFDING HOBBIES!" }), _jsxs("p", { class: "crazyProclamation", children: ["I AM A CHILD OF THE 90ties you cannot deny me text-decoration: blink!", _jsx("br", {}), "(Technically also of the 80ties though i rember bugger all of that....)"] })] }), _jsxs("div", { class: "wrapper", children: [_jsx("nav", { children: _jsxs("ul", { children: [RenderNode(Crafting, all), RenderNode(Media, all), RenderNode(CulinaryInterests, all)] }) }), _jsxs("main", { children: [_jsxs("summary", { children: [_jsx("h2", { children: "Summary" }), _jsxs("p", { children: ["I have way to many interests... i am creative chaos incarnate...", _jsx("br", {}), _jsx("br", {}), "My hobby is having hobbies."] })] }), DotNet.Render(), Typescript.Render(), GameDevelopment.Render(), Blacksmithing.Render(), Leathercrafting.Render(), Lasercutting.Render(), Printing3d.Render(), MNWSE.Render(), Drawing.Render(), Cad.Render(), Electronics.Render(), Music.Render(), Warhammer40k.Render(), Linux.Render(), Writing.Render(), Reading.Render(), Anime.Render(), favMovie.Render()] }), _jsxs("aside", { children: [_jsx("h2", { children: "Gallery" }), _jsx("img", { class: "limitWidth", src: "./assets/images/chess1.png", alt: "a picture of a cad design for a laser cuttable chessboard set" }), _jsx("img", { class: "limitWidth", src: "./assets/images/dyptych.png", alt: "a picture dyptych (wax tablet) and a hand holding a bronze stylus resting on top of a cassiotone ct-s300 keyboard for some reason." }), _jsx("img", { class: "limitWidth", src: "./assets/images/dyptych2.png", alt: "a picture of the back side of a dyptych(wax tablet) depicting an arched window a rose on one side and a rabbit knight on a lion and a sun" }), _jsx("img", { class: "limitWidth", src: "./assets/images/lasercut3dprint.jpg", alt: "A picture of a hopper built of 3d cut wood and joined together with 3d printed plastic brackets" }), _jsx("img", { class: "limitWidth", src: "./assets/images/Linux.png", alt: "a screen shoot of a heavily modified linux desktop made to look a bit more windows like but with the windows logo replaced by the adeptus machanicus logo and with a adeptus sororitas wallpaper" }), _jsx("img", { class: "limitWidth", src: "./assets/images/tripod.png", alt: "a picture of a home made 3d printed tripod utilizing electrical pvc pipes" }), _jsx("img", { class: "limitWidth", src: "./assets/images/chess2.jpg", alt: "a picture of a laser cut chess set but without the wood stain applied" }), _jsx("img", { class: "limitWidth", src: "./assets/images/redot.png", alt: "a picture of a 3d printed home made reddot sight made with glass from old slide projector frames." })] })] }), _jsx("footer", { children: "\u00A9 Omnicatz 2024" })] }));
        document.body.appendChild(body);
    }
}
//# sourceMappingURL=App.js.map