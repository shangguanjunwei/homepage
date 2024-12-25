import * as monaco from 'monaco-editor'

export const monaco_editor_base_config = (): monaco.editor.IStandaloneEditorConstructionOptions => ({
  autoIndent: 'brackets', // 自动缩进
  contextmenu: false, // 右键菜单
  autoClosingBrackets: 'always', // 自动关闭括号
  automaticLayout: true, // 自动布局
  cursorBlinking: 'expand', // 光标闪烁
  dragAndDrop: true, // 是否允许拖拽内容
  extraEditorClassName: 'amoayun-monaco-editor', // 额外的编辑器类名
  fixedOverflowWidgets: true, // 是否固定溢出的小部件
  glyphMargin: false, // 是否显示行号边距
  lineNumbers: 'on', // 显示行号
  matchBrackets: 'always', // 高亮匹配的括号
  minimap: {
    enabled: true,
  },
  overviewRulerBorder: true, // 是否显示概览标尺的边框
  padding: {
    top: 5,
    bottom: 5
  },
  readOnlyMessage: {
    value: '禁止编辑'
  }, // 只读时的提示信息
  scrollBeyondLastLine: false, // 是否允许滚动超过最后一行
  scrollbar: {
    horizontalScrollbarSize: 10,
    horizontalSliderSize: 10,
    verticalSliderSize: 8,
    verticalScrollbarSize: 8,
    ignoreHorizontalScrollbarInContentHeight: false,
  },
  showDeprecated: false, // 是否显示过时的代码
  showFoldingControls: 'always', // 折叠控件的显示方式
  smoothScrolling: true, // 是否平滑滚动
  tabCompletion: 'on', // 是否启用tab补全
  theme: 'vs-dark', // 主题
  unfoldOnClickAfterEndOfLine: true, // 点击行尾展开
  wordWrap: 'off', // 自动换行
  multiCursorLimit: 1, // 多光标限制
})