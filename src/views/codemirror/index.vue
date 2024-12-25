<template>
  <div>
    <a-space direction="vertical" fill>
      <a-drawer width="720px" v-model:visible="visible" unmountOnClose :footer="false">
        <template #title>
          完整配置
        </template>
        <a-collapse :default-active-key="[1, 2, 3]">
          <a-collapse-item header="基础配置" :key="1">
            <editorPropsFormContent v-model="editorPropsFormData" />
          </a-collapse-item>
          <a-collapse-item header="自定义提示" :key="2">
            <diySuggestOptions v-model="diySuggest" />
          </a-collapse-item>
          <a-collapse-item header="更多配置" :key="3">
            <editorConfig v-model="editorConfigFromData" />
          </a-collapse-item>
        </a-collapse>
      </a-drawer>
      <a-affix :offsetTop="0" target="#basic-scrollbar">
        <a-card title="基础配置">
          <template #extra>
            <a-button size="mini" type="primary" @click="visible = true">
              打开完整配置
            </a-button>
          </template>
          <a-form :model="editorPropsFormData" layout="inline" class="my-inline-form">
            <a-form-item label="模式">
              <a-select v-model="editorPropsFormData.mode" placeholder="请选择"
                :trigger-props="{ autoFitPopupMinWidth: true }" allow-clear :options="enums.modeEnums" />
            </a-form-item>
            <a-form-item label="语言">
              <a-select v-model="editorPropsFormData.language" placeholder="请选择" allow-search
                :trigger-props="{ autoFitPopupMinWidth: true }" allow-clear :options="enums.languageEnums" />
            </a-form-item>
          </a-form>
        </a-card>
      </a-affix>

      <!-- 外侧内容区域 -->
      <a-card :title="`${editorPropsFormData.mode || 'base'} 模式`">
        <a-space direction="vertical" fill>
          <a-row :gutter="10">
            <template v-if="editorPropsFormData.mode === 'base' || !editorPropsFormData.mode">
              <a-col :span="8">
                <a-card title="v-model:modelValue">
                  <a-textarea v-model="content" :auto-size="{ minRows: 4 }" placeholder="输入内容试试看？" />
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="选中的内容">
                  <a-textarea v-model="selectText" disabled :auto-size="{ minRows: 4 }"
                    placeholder="使用鼠标选中编辑器中的部分内容或者Ctrl+A选中编辑器的全部内容试试？" />
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="插入指定内容">
                  <template #extra>
                    <a-button size="mini" type="primary" @click="handleInsert">插入</a-button>
                  </template>
                  <a-textarea v-model="willInsertText" :auto-size="{ minRows: 4 }" placeholder="请输入想要插入的内容，然后点击插入试试？" />
                </a-card>
              </a-col>
            </template>
            <template v-if="editorPropsFormData.mode === 'diff'">
              <a-col :span="8">
                <a-card title="v-model:originalData">
                  <a-textarea v-model="originalData" :auto-size="{ minRows: 4 }" placeholder="输入内容试试看？" />
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="v-model:modifiedData">
                  <a-textarea v-model="modifiedData" :auto-size="{ minRows: 4 }" placeholder="输入内容试试看？" />
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="选中的内容">
                  <a-textarea v-model="selectText" disabled :auto-size="{ minRows: 4 }"
                    placeholder="使用鼠标选中编辑器中的部分内容或者Ctrl+A选中编辑器的全部内容试试？" />
                </a-card>
              </a-col>
            </template>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="24">
              <!-- 代码编辑器 -->
              <div class="out-code-div">
                <AmoAYunMonacoEditorVue3 ref="codeMirrorRef" v-model="content" :config="editorConfigFromData"
                  :mode="editorPropsFormData.mode" :language="editorPropsFormData.language"
                  :theme="editorPropsFormData.theme" :disabled="editorPropsFormData.disabled"
                  :placeholder="editorPropsFormData.placeholder" v-model:originalData="originalData"
                  :diySuggest="diySuggest" v-model:modifiedData="modifiedData" @select="text => selectText = text"
                  class="code-div" />
              </div>
            </a-col>
          </a-row>
        </a-space>
      </a-card>
    </a-space>
  </div>
</template>

<script setup lang="ts" name="codemirror">
import { reactive, ref, watch } from 'vue'
import { AmoAYunMonacoEditorVue3 } from '@/components/ayun/monaco-editor-vue3/publish_config/index'
import '@/components/ayun/monaco-editor-vue3/utils/worker'
import * as monaco from 'monaco-editor'
import editorPropsFormContent from './components/editorPropsFormContent.vue'
import editorConfig from './components/editorConfig.vue'
import diySuggestOptions from './components/diySuggestOptions.vue'
import enums from './enums'
const editorConfigFromData = reactive<monaco.editor.IStandaloneEditorConstructionOptions | monaco.editor.IStandaloneDiffEditorConstructionOptions>({
  autoIndent: 'brackets', // 自动缩进
  contextmenu: false, // 右键菜单
  autoClosingBrackets: 'always', // 自动关闭括号
  automaticLayout: true, // 自动布局
  cursorBlinking: 'expand', // 光标闪烁
  dragAndDrop: true, // 是否允许拖拽内容
  extraEditorClassName: 'my-test-editor', // 额外的编辑器类名
  fixedOverflowWidgets: true, // 是否固定溢出的小部件
  glyphMargin: false, // 是否显示行号边距
  lineNumbers: 'on', // 显示行号
  matchBrackets: 'always', // 高亮匹配的括号
  overviewRulerBorder: true, // 是否显示概览标尺的边框
  scrollBeyondLastLine: false, // 是否允许滚动超过最后一行
  showDeprecated: false, // 是否显示过时的代码
  showFoldingControls: 'always', // 折叠控件的显示方式
  smoothScrolling: true, // 是否平滑滚动
  tabCompletion: 'on', // 是否启用tab补全
  theme: 'vs-dark', // 主题
  unfoldOnClickAfterEndOfLine: true, // 点击行尾展开
  wordWrap: 'off', // 自动换行
})
const editorPropsFormData = reactive<any>({
  mode: 'base',
  theme: 'vs-dark',
  language: 'javascript',
  placeholder: '请输入',
  disabled: false,
})
const codeMirrorRef = ref<any>();
const content = ref<string>('// 输入 amoayun 试一试？');
const selectText = ref<string>('');
const willInsertText = ref<string>('');
const modifiedData = ref<string>('');
const originalData = ref<string>('');
const visible = ref<boolean>(false);
const diySuggest = ref<any[]>([
  {
    label: 'amoayun',
    kind: 17,
    insertText: '// hello, 我是 amoayun，非常开心能使用我开发的工具，好用的话就推荐给朋友吧！',
    detail: 'amoayun 自定义提示',
    documentation: 'hello, 我是 amoayun，非常开心能使用我开发的工具，好用的话就推荐给朋友吧！'
  }
]);
const handleInsert = () => codeMirrorRef.value.insertText(willInsertText.value)
watch(() => editorPropsFormData.mode, (newVal) => {
  if (newVal === 'base' || !newVal) {
    editorPropsFormData.disabled = false
    return
  }
  if (newVal === 'diff') {
    editorPropsFormData.disabled = [false, false]
    return
  }
})
</script>

<style scoped lang="less">
.out-code-div {
  width: 100%;
  height: 520px;

  .code-div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #000;
  }
}
</style>