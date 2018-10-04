import { IXmlJsonAttr, IXmlJsonAttrs, IXmlJsonElement, XmlJsonNodeType } from '@sunwalker/types';
import each from '@sunwalker/utils/each';
import has from '@sunwalker/utils/has';
import { trim } from '@sunwalker/utils/trim';
import { DefaultTreeDocumentFragment, DefaultTreeNode, DocumentFragment, parseFragment, serialize } from 'parse5';

const convert = (parseResult: DocumentFragment | any): IXmlJsonElement => {
    const res: IXmlJsonElement = {
        node: XmlJsonNodeType.root,
    };
    if (!parseResult) {
        return res;
    }
    let childNodes = parseResult.childNodes as DefaultTreeNode[];
    if (has(parseResult, 'nodeName')) {
        parseResult = parseResult as DefaultTreeDocumentFragment;
        if (parseResult.nodeName === '#document-fragment') {
            res.node = XmlJsonNodeType.root;
        } else if (parseResult.nodeName === '#text') {
            res.node = XmlJsonNodeType.text;
            res.value = parseResult.value;
        } else if (parseResult.nodeName === '#comment') {
            res.node = XmlJsonNodeType.comment;
            res.value = parseResult.data;
        } else if (parseResult.nodeName === parseResult.tagName) {
            res.node = XmlJsonNodeType.element;
            res.tag = parseResult.tagName.toLowerCase();
            if (parseResult.attrs && parseResult.attrs.length > 0) {
                const attrs: IXmlJsonAttrs = {};
                // 判断某属性是否是仅仅写了属性名，如：checked
                const onlyNameAttrs: string[] = [];
                Object.keys(parseResult.sourceCodeLocation.attrs).forEach((name) => {
                    const attr = parseResult.sourceCodeLocation.attrs[name];
                    if (name.length === attr.endOffset - attr.startOffset) {
                        onlyNameAttrs.push(name);
                    }
                });
                each(parseResult.attrs, (item: { name: string; value: any }) => {
                    const attr: IXmlJsonAttr = {
                        name: item.name,
                    };
                    if (onlyNameAttrs.indexOf(item.name) === -1) {
                        attr.value = item.value;
                    } else {
                        attr.onlyName = true;
                    }
                    attrs[item.name] = attr;
                });
                res.arrts = attrs;
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
        const children: IXmlJsonElement[] = [];
        each<DefaultTreeNode>(childNodes, (item) => {
            children.push(convert(item));
        });
        res.children = children;
    }
    return res;
};
export default (xml: string): IXmlJsonElement => {
    const result: DocumentFragment = parseFragment(xml, {
        sourceCodeLocationInfo: true,
    });
    return convert(result);
};
