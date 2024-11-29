export function getFunctionParams(func: Function): string[] {
    let txt = func.toString();
    let start = txt.indexOf("(") + 1;
    let end = txt.indexOf(")");
    return txt.substring(start, end).split(",").map(n => n.trim());
}