export enum XmlJsonNodeType {
    // 元素
    element,
    // 根节点
    root,
    // 文本
    text,
    // 注释
    comment,
}
export interface IXmlJsonAttr {
    // 属性名称
    name: string;
    // 属性值，可能为空
    value?: string;
    // 此属性代表编写xml时，对应的属性只书写了名称，如checked属性：<input checked />
    onlyName?: boolean;
}
export interface IXmlJsonAttrs {
    [prop: string]: IXmlJsonAttr;
}
export interface IXmlJsonElement {
    node: XmlJsonNodeType;
    // 节点标签，只有当node=element时，方存在值
    tag?: string;
    // 属性
    arrts?: IXmlJsonAttrs;
    // 子节点集合，可能为空
    children?: IXmlJsonElement[];
    // 节点值，node=text|comment时方可能存在值
    value?: string;
    // 自关闭标签，如：<br />
    selfClosing?: boolean;
}