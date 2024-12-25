<template>
  <div>
    <a-form :model="editorConfigFromData" auto-label-width>
      <a-form-item label="自动缩进">
        <a-radio-group v-model="editorConfigFromData.autoIndent" :options="enums.autoIndentEnums" />
      </a-form-item>
      <a-form-item label="右键菜单">
        <a-radio-group v-model="editorConfigFromData.contextmenu" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="自动关闭括号">
        <a-radio-group v-model="editorConfigFromData.autoClosingBrackets"
          :options="enums.editorAutoClosingStrategyEnums" />
      </a-form-item>
      <a-form-item label="自动布局">
        <a-radio-group v-model="editorConfigFromData.automaticLayout" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="光标模式">
        <a-radio-group v-model="editorConfigFromData.cursorBlinking" :options="enums.cursorBlinkingEnums" />
      </a-form-item>
      <a-form-item label="拖拽内容">
        <a-radio-group v-model="editorConfigFromData.dragAndDrop" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="额外的编辑器类名">
        <a-input v-model="editorConfigFromData.extraEditorClassName" />
      </a-form-item>
      <a-form-item label="固定溢出的小部件">
        <a-radio-group v-model="editorConfigFromData.fixedOverflowWidgets" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="显示行号边距">
        <a-radio-group v-model="editorConfigFromData.glyphMargin" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="显示行号">
        <a-radio-group v-model="editorConfigFromData.lineNumbers" :options="enums.lineNumbersEnums" />
      </a-form-item>
      <a-form-item label="高亮匹配的括号">
        <a-radio-group v-model="editorConfigFromData.matchBrackets" :options="enums.editorMatchBracketsEnums" />
      </a-form-item>
      <a-form-item label="是否显示概览标尺的边框">
        <a-radio-group v-model="editorConfigFromData.overviewRulerBorder" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="是否允许滚动超过最后一行">
        <a-radio-group v-model="editorConfigFromData.scrollBeyondLastLine" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="是否显示过时的代码">
        <a-radio-group v-model="editorConfigFromData.showDeprecated" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="折叠控件的显示方式">
        <a-radio-group v-model="editorConfigFromData.showFoldingControls"
          :options="enums.editorShowFoldingControlsEnums" />
      </a-form-item>
      <a-form-item label="折叠控件点击行尾展开">
        <a-radio-group v-model="editorConfigFromData.unfoldOnClickAfterEndOfLine" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="是否平滑滚动">
        <a-radio-group v-model="editorConfigFromData.smoothScrolling" :options="enums.disableEmums" />
      </a-form-item>
      <a-form-item label="是否启用tab补全">
        <a-radio-group v-model="editorConfigFromData.tabCompletion" :options="enums.tabCompletionEnums" />
      </a-form-item>
      <a-form-item label="自动换行">
        <a-radio-group v-model="editorConfigFromData.wordWrap" :options="enums.autoWrapEnums" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import enums from '../enums';
const editorConfigFromData = defineModel({ required: true, type: Object, default: () => ({}) })
</script>

<style scoped></style>