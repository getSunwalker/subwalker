/**
 * 节点node类型
 */
export enum XmlNodeType {
    /**
     * 元素
     */
    element = 'element',
    /**
     * 根节点
     */
    root = 'root',
    /**
     * 文本
     */
    text = 'text',
    /**
     * 注释
     */
    comment = 'comment',
}
/**
 * 节点属性
 */
export interface IXmlElementAttr {
    /**
     * 属性名称
     */
    name: string;
    /**
     * 属性值，可能为空
     */
    value?: string;
    /**
     * 此属性代表编写xml时，对应的属性只书写了名称，如checked属性：<input checked />
     */
    onlyName?: boolean;
}
/**
 * 节点属性key/value映射
 */
export interface IXmlElementAttrMap {
    [prop: string]: IXmlElementAttr;
}
/**
 * xml节点
 */
export interface IXmlElement {
    node: XmlNodeType;
    /**
     * 节点标签名，只有当node=element时，方存在值
     */
    tag?: string;
    /**
     * 属性map
     */
    attrMap?: IXmlElementAttrMap;
    /**
     * 属性集合
     */
    attrs?: IXmlElementAttr[];
    /**
     * 子节点集合
     */
    children?: IXmlElement[];
    /**
     * 节点值，只有node=text|comment是才有值
     */
    value?: string;
    /**
     * 是否是自关闭标签，如：<br />
     */
    selfClosing?: boolean;
}