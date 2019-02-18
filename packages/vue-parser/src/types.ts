import { ElementLocation } from 'parse5';
export type IElementLocation = ElementLocation;
/**
 * 节点node类型
 */
export enum NodeType {
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
export interface IElementAttr {
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
export interface IElementAttrMap {
    [prop: string]: IElementAttr;
}
/**
 * xml节点
 */
export interface IElement {
    node: NodeType;
    /**
     * 节点标签名，只有当node=element时，方存在值
     */
    tag?: string;
    /**
     * 属性map
     */
    attrMap?: IElementAttrMap;
    /**
     * 属性集合
     */
    attrs?: IElementAttr[];
    /**
     * 子节点集合
     */
    children?: IElement[];
    /**
     * 节点值，只有node=text|comment是才有值
     */
    value?: string;
    /**
     * 是否是自关闭标签，如：<br />
     */
    selfClosing?: boolean;
    /**
     * 代码位置
     */
    location: IElementLocation;
}

/**
 * vue 文件中的节点
 */
interface IVueElement extends IElement {
    node: NodeType.element;
}

/**
 * vue文件中的template节点信息
 */
export interface ITemplateElement extends IVueElement {
    tag: 'template';
    selfClosing: false;
}
/**
 * vue文件中的script节点信息
 */
export interface IScriptElement extends IVueElement {
    tag: 'script';
    /**
     * script 字符串
     */
    value: string;
    selfClosing: false;
}
/**
 * vue文件中的style节点信息
 */
export interface IStyleElement extends IVueElement {
    tag: 'style';
    /**
     * style 字符串
     */
    value: string;
    selfClosing: false;
    /**
     * 是否指定了scoped属性
     */
    scoped?: boolean;
    /**
     * 是否指定了lang属性
     */
    lang?: string;
}
export interface IScriptAst {
    ast: any;
}
/**
 * 节点属性ast
 */
export interface IElementAttrAst extends IElementAttr {
    /**
     * 属性值是否
     */
    static: boolean;
    ast: IScriptAst;
}
export interface IElementAttrAstMap {
    [name: string]: IElementAttrAst;
}
export interface ITemplateElementAst extends ITemplateElement {
    attrMap?: IElementAttrAstMap;
    attrs?: IElementAttrAst[];
}
export interface IScriptElementAst extends IScriptElement {
    ast: IScriptAst;
}
export interface IStyleElementAst extends IStyleElement {
    ast: any;
}
export interface IVueAst extends IElement {
    node: NodeType.root;
    template?: ITemplateElementAst;
    script: IScriptElementAst;
    styles?: IStyleElementAst[];
}
