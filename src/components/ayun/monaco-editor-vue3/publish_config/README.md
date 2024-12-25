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

#### SuggestItemOptions