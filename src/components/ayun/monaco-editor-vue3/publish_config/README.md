## 功能支持

- ✅ ✨两种模式： diff（代码比对编辑器），base（普通代码编辑器）
- ✅ ✨数据双向绑定：支持 v-model、v-model:originalData、v-model:modifiedData
- ✅ ✨多种主题：vs、vs-dark、hc-black、hc-light 四种主题
- ✅ ✨多种语言高亮：json、css、scss、less、html、typescript、javascript 等
- ✅ ✨自定义代码提示
- ✅ ✨插入文本
- ✅ ✨实时获取选中内容
- ✅ ✨消除 monaco-editor 副作用

## 快速使用

1. 安装依赖
  ```
  npm i @amoayun/monaco-editor-vue3
  ```

2. 组件依赖微软的 monaco-editor，所以需要安装 monaco-eidtor
  ```
  npm i monaco-editor
  ```

3. 代码引入
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

- ### Props

<table border>
  <thead>
    <tr>
      <th style="min-width:160px;">参数名</th>
      <th style="min-width:200px;">描述</th>
      <th>类型</th>
      <th style="min-width:80px;">默认值</th>
      <th style="min-width:80px;">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modelValue（v-model）</td>
      <td>绑定值（base模式）</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>originalData（v-model）</td>
      <td>绑定值（diff模式）</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>modifiedData（v-model）</td>
      <td>绑定值（diff模式）</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>mode</td>
      <td>编辑器模式</td>
      <td>'diff' | 'base'</td>
      <td>'base'</td>
      <td>-</td>
    </tr>
    <tr>
      <td>language</td>
      <td>编辑器语言</td>
      <td>string</td>
      <td>"javascript"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>编辑器主题</td>
      <td>"vs" | "vs-dark" | "hc-black" | "hc-light"</td>
      <td>"vs-dark"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>提示文字</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>是否禁用</td>
      <td>
        base模式：boolean
        <br />
        diff模式：[boolean, boolean]
      </td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>config</td>
      <td>代码编辑器配置</td>
      <td><em>ConfigOptions</em></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>diySuggest</td>
      <td>自定义提示</td>
      <td><em>SuggestItemOptions</em>[]</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

- ### Events

<table border>
  <thead>
    <tr>
      <th style="min-width:160px;">事件名</th>
      <th style="min-width:200px;">描述</th>
      <th>参数</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>select</td>
      <td>选中编辑器中的内容</td>
      <td>value:string</td>
    </tr>
  </tbody>
</table>

- ### Methods

<table border>
  <thead>
    <tr>
      <th style="min-width:160px;">方法名</th>
      <th style="min-width:200px;">描述</th>
      <th>参数</th>
      <th style="min-width:80px;">返回值</th>
      <th style="min-width:80px;">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>insertText</td>
      <td>插入内容（仅 base 模式可用）</td>
      <td>field:string</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

- ### Type

#### ConfigOptions

<table border>
  <thead>
    <tr>
      <th style="min-width: 160px">参数名</th>
      <th style="min-width: 200px">描述</th>
      <th>类型</th>
      <th style="min-width: 80px">默认值</th>
      <th style="min-width: 80px">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>autoIndent</td>
      <td>自动缩进</td>
      <td>"brackets"|"none"|"keep"|"advanced"|"full"</td>
      <td>"brackets"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>contextmenu</td>
      <td>右键菜单</td>
      <td>boolean</td>
      <td>false</td>
      <td>-</td>
    </tr>
    <tr>
      <td>autoClosingBrackets</td>
      <td>自动关闭括号</td>
      <td>"always"|"languageDefined"|"beforeWhitespace"|"never"</td>
      <td>"always"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>automaticLayout</td>
      <td>自动布局</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>cursorBlinking</td>
      <td>光标模式</td>
      <td>"blink"|"smooth"|"phase"|"expand"|"solid"</td>
      <td>"expand"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>dragAndDrop</td>
      <td>是否允许拖拽内容</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>extraEditorClassName</td>
      <td>额外的编辑器类名</td>
      <td>string</td>
      <td>"amoayun-monaco-editor"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>fixedOverflowWidgets</td>
      <td>固定溢出的小部件</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>glyphMargin</td>
      <td>是否显示行号边距</td>
      <td>boolean</td>
      <td>false</td>
      <td>-</td>
    </tr>
    <tr>
      <td>lineNumbers</td>
      <td>显示行号</td>
      <td>"on"|"off"|"relative"|"interval"</td>
      <td>"on"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>matchBrackets</td>
      <td>是否高亮匹配的括号</td>
      <td>"never"|"near"|"always"</td>
      <td>"always"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>overviewRulerBorder</td>
      <td>是否显示概览标尺的边框</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>scrollBeyondLastLine</td>
      <td>是否允许滚动超过最后一行</td>
      <td>boolean</td>
      <td>false</td>
      <td>-</td>
    </tr>
    <tr>
      <td>showDeprecated</td>
      <td>是否显示过时的代码</td>
      <td>boolean</td>
      <td>false</td>
      <td>-</td>
    </tr>
    <tr>
      <td>showFoldingControls</td>
      <td>折叠控件的显示方式</td>
      <td>"always"|"never"|"mouseover"</td>
      <td>"always"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>unfoldOnClickAfterEndOfLine</td>
      <td>折叠控件点击行尾展开</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>smoothScrolling</td>
      <td>是否平滑滚动</td>
      <td>boolean</td>
      <td>true</td>
      <td>-</td>
    </tr>
    <tr>
      <td>tabCompletion</td>
      <td>是否启用tab补全</td>
      <td>"on"|"off"|"onlySnippets"</td>
      <td>"on"</td>
      <td>-</td>
    </tr>
    <tr>
      <td>wordWrap</td>
      <td>自动换行</td>
      <td>"off"|"on"|"wordWrapColumn"|"bounded"</td>
      <td>"off"</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### SuggestItemOptions

<table border>
  <thead>
    <tr>
      <th style="min-width: 160px">参数名</th>
      <th style="min-width: 200px">描述</th>
      <th>类型</th>
      <th style="min-width: 80px">默认值</th>
      <th style="min-width: 80px">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>label</td>
      <td>关键词</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>kind</td>
      <td>提示类型</td>
      <td>number</td>
      <td>17</td>
      <td>-</td>
    </tr>
    <tr>
      <td>insertText</td>
      <td>关键词插入的文本</td>
      <td>string</td>
      <td>优先取insertText值，label次之</td>
      <td>-</td>
    </tr>
    <tr>
      <td>detail</td>
      <td>简述</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>documentation</td>
      <td>详细描述</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>