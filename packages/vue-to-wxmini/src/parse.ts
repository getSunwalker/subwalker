import each from '@sunwalker/utils/has';
import { default as xmlToJSON, IXmlElement, XmlNodeType } from '@sunwalker/xml-to-json';
export type ITemplateAST = IXmlElement
export interface IStyleAST {}
export interface IScriptST {}
export interface IParseResult {
    orgContent: string;
    template?: TemplateAST;
    style?: IStyleAST[];
    script?: IScriptST;
    xmlJSON: IXmlElement;
    templateJSON?: IXmlElement | any;
}
export default (vueContent: string): IParseResult => {
    const result: IParseResult = {
        orgContent: vueContent,
        xmlJSON: xmlToJSON(vueContent),
    };
    const templateJSON = result.xmlJSON.children
        ? result.xmlJSON.children.find((item) => item.node === XmlNodeType.element && item.tag === 'template')
        : null;
    result.templateJSON = templateJSON;
    return result;
};
