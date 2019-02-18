import { IXmlElementAttr, IXmlElementAttrMap, IXmlElement, XmlNodeType } from './types';
import each from '@sunwalker/utils/each';
import has from '@sunwalker/utils/has';
import { trim } from '@sunwalker/utils/trim';
import { DefaultTreeDocumentFragment, DefaultTreeNode, DocumentFragment, parseFragment } from 'parse5';

const convert = (parseResult: DocumentFragment | any): IXmlElement => {
    const res: IXmlElement = {
        node: XmlNodeType.root,
    };
    if (!parseResult) {
        return res;
    }
    let childNodes = parseResult.childNodes as DefaultTreeNode[];
    if (has(parseResult, 'nodeName')) {
        parseResult = parseResult as DefaultTreeDocumentFragment;
        if (parseResult.nodeName === '#document-fragment') {
            res.node = XmlNodeType.root;
        } else if (parseResult.nodeName === '#text') {
            res.node = XmlNodeType.text;
            res.value = parseResult.value;
        } else if (parseResult.nodeName === '#comment') {
            res.node = XmlNodeType.comment;
            res.value = parseResult.data;
        } else if (parseResult.nodeName === parseResult.tagName) {
            res.node = XmlNodeType.element;
            res.tag = parseResult.tagName.toLowerCase();
            if (parseResult.attrs && parseResult.attrs.length > 0) {
                const attrMap: IXmlElementAttrMap = {};
                const attrs: IXmlElementAttr[] = [];
                // 判断某属性是否是仅仅写了属性名，如：checked
                const onlyNameAttrs: string[] = [];
                Object.keys(parseResult.sourceCodeLocation.attrs).forEach((name) => {
                    const attr = parseResult.sourceCodeLocation.attrs[name];
                    if (name.length === attr.endOffset - attr.startOffset) {
                        onlyNameAttrs.push(name);
                    }
                });
                each<{ name: string; value: any }>(parseResult.attrs, (item) => {
                    const attr: IXmlElementAttr = {
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
        const children: IXmlElement[] = [];
        each<DefaultTreeNode>(childNodes, (item) => {
            children.push(convert(item));
        });
        res.children = children;
    }
    return res;
};
/**
 * 将xml字符串转换成ast json
 * @param xml {String} xml字符串
 * @return ast json
 */
export const parse = (xml: string): IXmlElement => {
    xml = trim(xml)
    const result: DocumentFragment = parseFragment(xml, {
        sourceCodeLocationInfo: true,
    });
    return convert(result);
};

export const serialize = (el: IXmlElement): string => {
    return ''
}

export default {
    parse,
    serialize
}