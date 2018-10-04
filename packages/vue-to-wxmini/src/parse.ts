import each from '@sunwalker/utils/has';
import { default as xmlToJSON, IXmlJsonElement, XmlJsonNodeType } from '@sunwalker/xml-to-json';
export type ITemplateAST = IXmlJsonElement
export interface IStyleAST {}
export interface IScriptST {}
export interface IParseResult {
    orgContent: string;
    template?: TemplateAST;
    style?: IStyleAST[];
    script?: IScriptST;
    xmlJSON: IXmlJsonElement;
    templateJSON?: IXmlJsonElement | any;
}
export default (vueContent: string): IParseResult => {
    const result: IParseResult = {
        orgContent: vueContent,
        xmlJSON: xmlToJSON(vueContent),
    };
    const templateJSON = result.xmlJSON.children
        ? result.xmlJSON.children.find((item) => item.node === XmlJsonNodeType.element && item.tag === 'template')
        : null;
    result.templateJSON = templateJSON;
    return result;
};
