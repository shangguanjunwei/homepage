## Feature Support

- ✅ ✨Two modes: `diff` (code comparison editor), `base` (regular code editor)
- ✅ ✨Two-way data binding: supports `v-model`, `v-model:originalData`, `v-model:modifiedData`
- ✅ ✨Multiple themes: `vs`, `vs-dark`, `hc-black`, `hc-light`
- ✅ ✨Multiple language highlighting: JSON, CSS, SCSS, LESS, HTML, TypeScript, JavaScript, etc.
- ✅ ✨Multiple language code suggestions and customizable code suggestions
- ✅ ✨Insert text
- ✅ ✨Real-time content selection
- ✅ ✨Elimination of monaco-editor side effects
- More features can be experienced in the [Online Demo](https://commontalk.cn)

## Online Demo

For more features, please visit the [Online Demo](https://commontalk.cn)

## Quick Start

1. **Install dependencies**
```bash
npm i @amoayun/monaco-editor-vue3
```

2. **The component relies on Microsoft's `monaco-editor`, so you need to install it**
```bash
npm i monaco-editor
```

3. **Code Import**
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

## Advanced Usage

### Props
| Name | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| modelValue (`v-model`) | Bound value (base mode) | string | - | - |
| originalData (`v-model`) | Bound value (diff mode) | string | - | - |
| modifiedData (`v-model`) | Bound value (diff mode) | string | - | - |
| mode | Editor mode | 'diff' \| 'base' | 'base' | - |
| language | Editor language | string | "javascript" | - |
| theme | Editor theme | "vs" \| "vs-dark" \| "hc-black" \| "hc-light" | "vs-dark" | - |
| placeholder | Placeholder text | string | - | - |
| disabled | Disabled state | base mode: boolean<br />diff mode: [boolean, boolean] | - | - |
| config | Code editor configuration | <em>ConfigOptions</em> (see Type below) | - | - |
| diySuggest | Custom suggestions | <em>SuggestItemOptions</em>[] (see Type below) | - | - |

### Events
| Event Name | Description | Parameter |
| ---- | ---- | ---- |
| select | Select content in the editor | value:string |

- Example Usage:
```javascript
<template>
    <div>
        <AmoAYunMonacoEditorVue3 v-model="content" language="javascript" style="width: 100%;height: 400px;" @select="handleSelect" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { AmoAYunMonacoEditorVue3 } from "@amoayun/monaco-editor-vue3";

    const content = ref("");

    const handleSelect = (value: string) => {
        console.log(value);
    };
</script>
```

### Methods
| Method Name | Description | Parameter | Return | Version |
| ---- | ---- | ---- | ---- | ---- |
| insertText | Insert content (only available in base mode) | field:string | - | - |

- Example Usage:
```javascript
<template>
    <div>
        <AmoAYunMonacoEditorVue3 v-model="content" language="javascript" style="width: 100%;height: 400px;" ref="editor" />
        <button @click="handleInsert">Insert Content</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { AmoAYunMonacoEditorVue3 } from "@amoayun/monaco-editor-vue3";

    const content = ref<string>("");
    const editor = ref<any>(null);

    const handleInsert = () => {
        editor.value?.insertText("hello world");
    };
</script>
```

### Type

#### ConfigOptions
| Name | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| autoIndent | Auto indentation | "brackets" \| "none" \| "keep" \| "advanced" \| "full" | "brackets" | - |
| contextmenu | Right-click menu | boolean | false | - |
| autoClosingBrackets | Auto closing brackets | "always" \| "languageDefined" \| "beforeWhitespace" \| "never" | "always" | - |
| automaticLayout | Automatic layout | boolean | true | - |
| cursorBlinking | Cursor style | "blink" \| "smooth" \| "phase" \| "expand" \| "solid" | "expand" | - |
| dragAndDrop | Allow content drag and drop | boolean | true | - |
| extraEditorClassName | Additional editor class name | string | "amoayun-monaco-editor" | - |
| fixedOverflowWidgets | Fixed overflow widgets | boolean | true | - |
| glyphMargin | Show line number margin | boolean | false | - |
| lineNumbers | Display line numbers | "on" \| "off" \| "relative" \| "interval" | "on" | - |
| matchBrackets | Highlight matching brackets | "never" \| "near" \| "always" | "always" | - |
| overviewRulerBorder | Show overview ruler border | boolean | true | - |
| scrollBeyondLastLine | Allow scrolling beyond the last line | boolean | false | - |
| showDeprecated | Show deprecated code | boolean | false | - |
| showFoldingControls | Folding controls display | "always" \| "never" \| "mouseover" | "always" | - |
| unfoldOnClickAfterEndOfLine | Unfold on end of line click | boolean | true | - |
| smoothScrolling | Enable smooth scrolling | boolean | true | - |
| tabCompletion | Enable tab completion | "on" \| "off" \| "onlySnippets" | "on" | - |
| wordWrap | Word wrapping | "off" \| "on" \| "wordWrapColumn" \| "bounded" | "off" | - |

#### SuggestItemOptions
| Name | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| label | Keyword | string | - | - |
| kind | Suggestion type | number | 17 | - |
| insertText | Text to insert for the keyword | string | Uses insertText value first, label second | - |
| detail | Brief description | string | - | - |
| documentation | Detailed description | string | - | - |


