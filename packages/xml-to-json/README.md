# xml-to-json
将xml转换为json对象

## 安装
```bash
npm i @sunwalker/xml-to-json -S
```

## 使用
```js
const xmlToJSON = require('@sunwalker/xml-to-json')
const result = xmlToJSON(`
    <div class="box">
        <!--sayhi-->
        <p>hi Tom</p>
        <input type="checkbox" checked />
    </div>
`)
console.log(result);
/*
{
    node: 'root',
    children: [
        {
            node: 'element',
            tag: 'div',
            attrs: {
                'class': {
                    name: 'class',
                    value: 'box',
                }
            },
            children: [
                {
                    node: 'comment',
                    value: 'sayhi'
                },
                {
                    node: 'element',
                    tag: 'p',
                    attrs: undefined,
                    children: [
                        {
                            node: 'text',
                            value: 'hi Tom'
                        }
                    ]
                },
                {
                    node: 'element',
                    tag: 'input',
                    attrs: {
                        type: {
                            name: 'type',
                            value: 'checkbox'
                        },
                        checked: {
                            name: 'checked',
                            onlyName: true
                        }
                    }
                }
            ]
        }
    ]
}
*/
```

## 文档
转换后的json对象可包含以下属性：
- `node`代表元素类型，有四种值：
    - `element`html元素
    - `text`文本
    - `root`根节点
    - `comment`注释
- `attrs`代表元素有哪些属性
- `children`代表有哪些子元素