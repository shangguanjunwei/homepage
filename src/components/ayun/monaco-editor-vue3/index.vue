<template>
  <div style="box-sizing: border-box;">
    <div ref="editorRef" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watchPostEffect } from 'vue'
import * as monaco from 'monaco-editor'
import registerProvider from './utils/registerProvider'
import { monaco_editor_base_config } from './config'

namespace MyMonacoEditor {
  export interface Props {
    mode?: string;
    config?: monaco.editor.IStandaloneEditorConstructionOptions | monaco.editor.IStandaloneDiffEditorConstructionOptions;
    placeholder?: string;
    disabled?: boolean | [boolean, boolean];
    language?: string;
    theme?: string;
    diySuggest?: monaco.languages.CompletionItem[];
    modelValue?: string
    modifiedData?: string
    originalData?: string
  }
  export interface Expose {
    insertText: (text: string) => void
  }
}
const props = defineProps<MyMonacoEditor.Props>()
const emits = defineEmits([
  'update:modelValue',
  'update:modifiedData',
  'update:originalData',
  'select'
]);
const editorRef = ref<HTMLElement | null>(null)
let editor: Partial<monaco.editor.IStandaloneCodeEditor> = {};
let diffEditor: Partial<monaco.editor.IStandaloneDiffEditor> = {};
let languageProvider: monaco.IDisposable | null = null
const editorIsReady = ref<boolean>(false)
const finalMode = computed(() => props.mode || 'base')
const finalLanguage = computed(() => props.language || 'javascript')
const finalTheme = computed(() => props.theme || 'vs-dark')

const initBaseData = () => {
  editor = monaco.editor.create(
    editorRef.value!,
    monaco_editor_base_config(),
  )
  const model = monaco.editor.createModel('')
  editor.setModel && editor.setModel(model)
  editor.onDidChangeModelContent && editor.onDidChangeModelContent(() => {
    const model = editor.getModel && editor.getModel()
    if (model) {
      const value = model.getValue()
      emits('update:modelValue', value || '')
    }
  })
  editor.onDidChangeCursorSelection && editor.onDidChangeCursorSelection(() => {
    const selection = editor.getSelection && editor.getSelection(); // 获取当前选区
    if (!selection) return ''; // 如果没有选区，返回空字符串
    const model = editor.getModel && editor.getModel(); // 获取编辑器模型
    const text = model!.getValueInRange(selection); // 提取选中的文本
    emits('select', text); // 触发select事件
  })
}
const initDiffData = () => {
  diffEditor = monaco.editor.createDiffEditor(
    editorRef.value!,
    monaco_editor_base_config()
  )
  const modifiedModel = monaco.editor.createModel('12\n34\n56\n78\n90')
  const originalModel = monaco.editor.createModel('12')
  diffEditor.setModel && diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel
  })
  const modifiedModal = diffEditor.getModifiedEditor && diffEditor.getModifiedEditor()
  const originalModal = diffEditor.getOriginalEditor && diffEditor.getOriginalEditor()
  modifiedModal?.onDidChangeModelContent && modifiedModal.onDidChangeModelContent(() => {
    const value = modifiedModel.getValue()
    emits('update:modifiedData', value || '')
  })
  originalModal?.onDidChangeModelContent && originalModal.onDidChangeModelContent(() => {
    const value = originalModel.getValue()
    emits('update:originalData', value || '')
  })
  modifiedModal?.onDidChangeCursorSelection && modifiedModal.onDidChangeCursorSelection(() => {
    const selection = modifiedModal.getSelection && modifiedModal.getSelection(); // 获取当前选区
    if (!selection) return ''; // 如果没有选区，返回空字符串
    const text = modifiedModel.getValueInRange(selection); // 提取选中的文本
    emits('select', text); // 触发select事件
  })
  originalModal?.onDidChangeCursorSelection && originalModal.onDidChangeCursorSelection(() => {
    const selection = originalModal.getSelection && originalModal.getSelection(); // 获取当前选区
    if (!selection) return ''; // 如果没有选区，返回空字符串
    const text = originalModel.getValueInRange(selection); // 提取选中的文本
    emits('select', text); // 触发select事件
  })
}
// 销毁编辑器
const onDispose = () => {
  editor.dispose && editor.dispose()
  diffEditor.dispose && diffEditor.dispose()
}
onBeforeUnmount(() => onDispose())
watchPostEffect(() => {
  onDispose()
  finalMode.value === 'base' && initBaseData()
  finalMode.value === 'diff' && initDiffData()
  editorIsReady.value = true
})
watchPostEffect(() => {
  if (!editorIsReady.value) return;
  // 如果是 代码编辑器
  if (finalMode.value === 'base') {
    const config = {
      ...(props.config || {}),
      placeholder: props.placeholder || '',
      theme: finalTheme.value
    }
    editor.updateOptions && editor.updateOptions(config)
    return
  }
  // 如果是 diff 编辑器
  if (finalMode.value === 'diff') {
    const config = {
      ...(props.config || {}),
      placeholder: props.placeholder || '',
      theme: finalTheme.value
    }
    diffEditor.updateOptions && diffEditor.updateOptions(config)
    return
  }
})
watchPostEffect(() => {
  if (!editorIsReady.value) return;
  if (finalMode.value === 'base') {
    let readOnly = false
    if (Array.isArray(props.disabled)) {
      readOnly = props.disabled[0]
      console.error('【提示🔔】编辑器的mode为base,disabled属性应该为boolean类型，现在是数组类型，readOnly 将取数组的第一个值')
    } else {
      readOnly = !!props.disabled
    }
    editor.updateOptions && editor.updateOptions({ readOnly })
    return
  }
  if (finalMode.value === 'diff') {
    let modifiedReadOnly = true
    let originalReadOnly = true
    if (Array.isArray(props.disabled)) {
      modifiedReadOnly = props.disabled[0]
      originalReadOnly = props.disabled[1]
    } else {
      modifiedReadOnly = !!props.disabled
      originalReadOnly = true
      console.error(`【提示🔔】编辑器的mode为diffdisabled属性应该为数组类型，现在是boolean类型。 \n modified 的 readOnly 取 disabled 的值； \n original 的 readOnly 取默认值 true。`)
    }
    const modifiedModel = diffEditor.getModifiedEditor && diffEditor.getModifiedEditor()
    const originalModel = diffEditor.getOriginalEditor && diffEditor.getOriginalEditor()
    // diffEditor 设置 readOnly 为 true，是为了防止 modified 的值在删除一行内容的时候报错
    diffEditor.updateOptions && diffEditor.updateOptions({ readOnly: true })
    modifiedModel && modifiedModel.updateOptions({ readOnly: modifiedReadOnly })
    originalModel && originalModel.updateOptions({ readOnly: originalReadOnly })
    return
  }
})
watchPostEffect(() => {
  if (!editorIsReady.value) return;
  if (finalMode.value === 'base') {
    const model = editor.getModel && editor.getModel()
    if (model && finalLanguage.value) {
      monaco.editor.setModelLanguage(model, '')
      monaco.editor.setModelLanguage(model, finalLanguage.value || '')
    }
    languageProvider && languageProvider.dispose()
    languageProvider = registerProvider(finalLanguage.value, props.diySuggest || [])
    return
  }
  if (finalMode.value === 'diff') {
    const { modified, original } = diffEditor.getModel && diffEditor.getModel() || {}
    if (modified && original && finalLanguage.value) {
      monaco.editor.setModelLanguage(modified, '')
      monaco.editor.setModelLanguage(modified, finalLanguage.value || '')
      monaco.editor.setModelLanguage(original, '')
      monaco.editor.setModelLanguage(original, finalLanguage.value || '')
    }
    languageProvider && languageProvider.dispose()
    languageProvider = registerProvider(finalLanguage.value, props.diySuggest || [])
    return
  }
})
watchPostEffect(() => {
  if (!editorIsReady.value) return;
  if (finalMode.value === 'base') {
    const model = editor.getModel && editor.getModel()
    if (model && props.modelValue !== model.getValue()) {
      editor.setValue && editor.setValue(props.modelValue || '')
    }
    return
  }
  if (finalMode.value === 'diff') {
    const { modified, original } = diffEditor.getModel && diffEditor.getModel() || {}
    if (modified && props.modifiedData !== modified.getValue()) {
      modified.setValue(props.modifiedData || '')
    }
    if (original && props.originalData !== original.getValue()) {
      original.setValue(props.originalData || '')
    }
    return
  }
})
const insertText = (text: string) => {
  if (finalMode.value === 'base') {
    const position: monaco.Position = (editor.getPosition && editor.getPosition())!
    editor.executeEdits && editor.executeEdits('my-source', [
      {
        range: new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        ),
        text: text,
        forceMoveMarkers: true, // 确保光标和标记更新到新位置
      },
    ]);
    editor.focus && editor.focus()
    return
  }
}
// 对外抛出方法
defineExpose<MyMonacoEditor.Expose>({
  insertText
})
</script>

<style scoped></style>