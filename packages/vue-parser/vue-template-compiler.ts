import { IXmlElement, IXmlElementAttr } from './xml-to-json';
export interface IVueElementAttr extends IXmlElementAttr {
    // 属性值是否的静态值，静态值指的是字符串、数字等字面量
    static: boolean;
    // 属性值非静态时，此值为解析后的babel ast树
    ast?: any;
}
export interface IVueElement extends IXmlElement {
    attrs?: IVueElementAttr[];
}