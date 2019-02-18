import each from '@sunwalker/utils/each';
import has from '@sunwalker/utils/has';
import { trim } from '@sunwalker/utils/trim';
import { DefaultTreeElement, DefaultTreeTextNode, parseFragment } from 'parse5';
import { IElement, IElementAttr, IElementAttrMap, IElementLocation, IVueAst, NodeType } from './types';

const convert = (parseResult: DocumentFragment | any): IElement => {
    const res: IElement = {
        location: parseResult.sourceCodeLocation as IElementLocation,
        node: NodeType.root,
    };
    if (!parseResult) {
        return res;
    }
    let childNodes = parseResult.childNodes as DefaultTreeElement[];
    if (has(parseResult, 'nodeName')) {
        if (parseResult.nodeName === '#document-fragment') {
            res.node = NodeType.root;
        } else if (parseResult.nodeName === '#text') {
            res.node = NodeType.text;
            parseResult = parseResult as DefaultTreeTextNode;
            res.value = parseResult.value;
        } else if (parseResult.nodeName === '#comment') {
            res.node = NodeType.comment;
            res.value = parseResult.data;
        } else if (parseResult.nodeName === parseResult.tagName) {
            parseResult = parseResult as DefaultTreeElement;
            res.node = NodeType.element;
            res.tag = parseResult.tagName.toLowerCase();
            if (parseResult.attrs && parseResult.attrs.length > 0) {
                const attrMap: IElementAttrMap = {};
                const attrs: IElementAttr[] = [];
                // 判断某属性是否是仅仅写了属性名，如：checked
                const onlyNameAttrs: string[] = [];
                Object.keys(parseResult.sourceCodeLocation.attrs).forEach((name) => {
                    const attr = parseResult.sourceCodeLocation.attrs[name];
                    if (name.length === attr.endOffset - attr.startOffset) {
                        onlyNameAttrs.push(name);
                    }
                });
                each<{ name: string; value: any }>(parseResult.attrs, (item) => {
                    const attr: IElementAttr = {
                        name: item.name,
                    };
                    if (onlyNameAttrs.indexOf(item.name) === -1) {
                        attr.value = item.value;
                    } else {
                        attr.onlyName = true;
                    }
                    attrMap[item.name] = attr;
                    attrs.push(attr);
                });
                res.attrMap = attrMap;
                res.attrs = attrs;
            }

            // 标签是否是自闭合的
            if (!parseResult.sourceCodeLocation.endTag) {
                res.selfClosing = true;
            }
        }
        if (parseResult.nodeName === 'template') {
            childNodes = parseResult.content.childNodes;
        }
    }
    if (childNodes && childNodes.length > 0) {
        const children: IElement[] = [];
        each<DefaultTreeElement>(childNodes, (item) => {
            children.push(convert(item));
        });
        res.children = children;
    }
    return res;
};

const toAst = (json: IElement): IVueAst => {
    const result: IVueAst = json as IVueAst;
    return result;
};

/**
 * 将xml字符串转换成ast json
 * @param xml {String} xml字符串
 * @return ast json
 */
export default (xml: string): IVueAst => {
    xml = trim(xml);
    const json = parseFragment(xml, {
        sourceCodeLocationInfo: true,
    });
    return toAst(convert(json as DefaultTreeElement));
};
