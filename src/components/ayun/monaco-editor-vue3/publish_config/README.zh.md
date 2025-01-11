## 功能支持

- ✅ ✨两种模式： diff（代码比对编辑器），base（普通代码编辑器）
- ✅ ✨数据双向绑定：支持 v-model、v-model:originalData、v-model:modifiedData
- ✅ ✨多种主题：vs、vs-dark、hc-black、hc-light 四种主题
- ✅ ✨多种语言高亮：json、css、scss、less、html、typescript、javascript 等
- ✅ ✨多种语言代码提示，并且支持自定义代码提示
- ✅ ✨插入文本
- ✅ ✨实时获取选中内容
- ✅ ✨消除 monaco-editor 副作用
- 更多功能可以在这里[在线演示](https://commontalk.cn)使用

## 在线演示

了解更多功能请点击[在线演示](https://commontalk.cn)

## 快速使用

1. **安装依赖**
```
npm i @amoayun/monaco-editor-vue3
```

2. **组件依赖微软的 monaco-editor，所以需要安装 monaco-eidtor**
```
npm i monaco-editor
```

3. **代码引入**
   
   <span style="color: #f00;font-weight: bold;">【注意】</span>diff 模式下，需要传入两个 v-model，分别为 <em>originalData</em> 和 <em>modifiedData</em>，不是 默认的 <em>modelValue</em>（详见高级用法中的props）
   
```javascript
<template>
    <div>
        <AmoAYunMonacoEditorVue3 v-model="content" language="javascript"  style="width: 100%;height: 400px;" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { AmoAYunMonacoEditorVue3 } from "@amoayun/monaco-editor-vue3";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
    import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

    self.MonacoEnvironment = {
        getWorker(_, label) {
            switch (label) {
                case "json":
                    return new jsonWorker();
                case "css":
                case "scss":
                case "less":
                    return new cssWorker();
                case "html":
                case "handlebars":
                case "razor":
                    return new htmlWorker();
                case "typescript":
                case "javascript":
                    return new tsWorker();
                default:
                    return new editorWorker();
            }
        },
    };

    const content = ref("");
</script>
```

## 高级用法

### Props
| 参数名                  | 描述               | 类型                                                | 默认值       | 版本 |
| ----------------------- | ------------------ | --------------------------------------------------- | ------------ | ---- |
| modelValue（v-model）   | 绑定值（base模式） | string                                              | -            | -    |
| originalData（v-model） | 绑定值（diff模式） | string                                              | -            | -    |
| modifiedData（v-model） | 绑定值（diff模式） | string                                              | -            | -    |
| mode                    | 编辑器模式         | 'diff' \| 'base'                                    | 'base'       | -    |
| language                | 编辑器语言         | string                                              | "javascript" | -    |
| theme                   | 编辑器主题         | "vs" \| "vs-dark" \| "hc-black" \| "hc-light"       | "vs-dark"    | -    |
| placeholder             | 提示文字           | string                                              | -            | -    |
| disabled                | 是否禁用           | base模式：boolean<br />diff模式：[boolean, boolean] | -            | -    |
| config                  | 代码编辑器配置     | <em>ConfigOptions</em>（详见下面Type）              | -            | -    |
| diySuggest              | 自定义提示         | <em>SuggestItemOptions</em>[]（详见下面Type）       | -            | -    |

### Events
| 事件名 | 描述               | 参数         |
| ------ | ------------------ | ------------ |
| select | 选中编辑器中的内容 | value:string |

- 使用示例
```javascript
<template>
    <div>
        <AmoAYunMonacoEditorVue3 v-model="content" language="javascript"  style="width: 100%;height: 400px;" @select="handleSelect" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { AmoAYunMonacoEditorVue3 } from "@amoayun/monaco-editor-vue3";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
    import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

    self.MonacoEnvironment = {
        getWorker(_, label) {
            switch (label) {
                case "json":
                    return new jsonWorker();
                case "css":
                case "scss":
                case "less":
                    return new cssWorker();
                case "html":
                case "handlebars":
                case "razor":
                    return new htmlWorker();
                case "typescript":
                case "javascript":
                    return new tsWorker();
                default:
                    return new editorWorker();
            }
        },
    };

    const content = ref("");

    const handleSelect = (value: string) => {
        console.log(value);
    };
</script>
```


### Methods
| 方法名     | 描述                         | 参数         | 返回值 | 版本 |
| ---------- | ---------------------------- | ------------ | ------ | ---- |
| insertText | 插入内容（仅 base 模式可用） | field:string | -      | -    |

- 使用示例
```javascript
<template>
    <div>
        <AmoAYunMonacoEditorVue3 v-model="content" language="javascript"  style="width: 100%;height: 400px;" ref="editor" />
        <button @click="handleInsert">插入内容</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { AmoAYunMonacoEditorVue3 } from "@amoayun/monaco-editor-vue3";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
    import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

    self.MonacoEnvironment = {
        getWorker(_, label) {
            switch (label) {
                case "json":
                    return new jsonWorker();
                case "css":
                case "scss":
                case "less":
                    return new cssWorker();
                case "html":
                case "handlebars":
                case "razor":
                    return new htmlWorker();
                case "typescript":
                case "javascript":
                    return new tsWorker();
                default:
                    return new editorWorker();
            }
        },
    };

    const content = ref<string>("");
    const editor = ref<any>(null);

    const handleInsert = () => {
        editor.value?.insertText("hello world");
    };
</script>
```

### Type

#### ConfigOptions
| 参数名                      | 描述                     | 类型                                                           | 默认值                  | 版本 |
| --------------------------- | ------------------------ | -------------------------------------------------------------- | ----------------------- | ---- |
| autoIndent                  | 自动缩进                 | "brackets" \| "none" \| "keep" \| "advanced" \| "full"         | "brackets"              | -    |
| contextmenu                 | 右键菜单                 | boolean                                                        | false                   | -    |
| autoClosingBrackets         | 自动关闭括号             | "always" \| "languageDefined" \| "beforeWhitespace" \| "never" | "always"                | -    |
| automaticLayout             | 自动布局                 | boolean                                                        | true                    | -    |
| cursorBlinking              | 光标模式                 | "blink" \| "smooth" \| "phase" \| "expand" \| "solid"          | "expand"                | -    |
| dragAndDrop                 | 是否允许拖拽内容         | boolean                                                        | true                    | -    |
| extraEditorClassName        | 额外的编辑器类名         | string                                                         | "amoayun-monaco-editor" | -    |
| fixedOverflowWidgets        | 固定溢出的小部件         | boolean                                                        | true                    | -    |
| glyphMargin                 | 是否显示行号边距         | boolean                                                        | false                   | -    |
| lineNumbers                 | 显示行号                 | "on" \| "off" \| "relative" \| "interval"                      | "on"                    | -    |
| matchBrackets               | 是否高亮匹配的括号       | "never" \| "near" \| "always"                                  | "always"                | -    |
| overviewRulerBorder         | 是否显示概览标尺的边框   | boolean                                                        | true                    | -    |
| scrollBeyondLastLine        | 是否允许滚动超过最后一行 | boolean                                                        | false                   | -    |
| showDeprecated              | 是否显示过时的代码       | boolean                                                        | false                   | -    |
| showFoldingControls         | 折叠控件的显示方式       | "always" \| "never" \| "mouseover"                             | "always"                | -    |
| unfoldOnClickAfterEndOfLine | 折叠控件点击行尾展开     | boolean                                                        | true                    | -    |
| smoothScrolling             | 是否平滑滚动             | boolean                                                        | true                    | -    |
| tabCompletion               | 是否启用tab补全          | "on" \| "off" \| "onlySnippets"                                | "on"                    | -    |
| wordWrap                    | 自动换行                 | "off" \| "on" \| "wordWrapColumn" \| "bounded"                 | "off"                   | -    |

#### SuggestItemOptions
| 参数名        | 描述             | 类型   | 默认值                        | 版本 |
| ------------- | ---------------- | ------ | ----------------------------- | ---- |
| label         | 关键词           | string | -                             | -    |
| kind          | 提示类型         | number | 17                            | -    |
| insertText    | 关键词插入的文本 | string | 优先取insertText值，label次之 | -    |
| detail        | 简述             | string | -                             | -    |
| documentation | 详细描述         | string | -                             | -    |