import * as monaco from 'monaco-editor'

export const modeEnums = [
  { label: 'base（默认）', value: 'base' },
  { label: 'diff', value: 'diff' },
]
export const languageEnums = monaco.languages.getLanguages().map((item) => {
  if (item.id === 'javascript') {
    return { label: `${item.id}（默认）`, value: item.id }
  } else {
    return { label: item.id, value: item.id }
  }
}).sort((a, b) => a.label.localeCompare(b.label))
export const themeEnums = [
  { label: 'vs', value: 'vs' },
  { label: 'vs-dark（默认）', value: 'vs-dark' },
  { label: 'hc-black', value: 'hc-black' },
  { label: 'hc-light', value: 'hc-light' },
]
export const disableEmums: any[] = [
  { label: 'true', value: true },
  { label: 'false', value: false },
]
export const autoIndentEnums = [
  { label: 'brackets', value: 'brackets' },
  { label: 'none', value: 'none' },
  { label: 'keep', value: 'keep' },
  { label: 'advanced', value: 'advanced' },
  { label: 'full', value: 'full' },
]
export const editorAutoClosingStrategyEnums = [
  { label: 'always', value: 'always' },
  { label: 'languageDefined', value: 'languageDefined' },
  { label: 'beforeWhitespace', value: 'beforeWhitespace' },
  { label: 'never', value: 'never' },
]
export const cursorBlinkingEnums = [
  { label: 'blink', value: 'blink' },
  { label: 'smooth', value: 'smooth' },
  { label: 'phase', value: 'phase' },
  { label: 'expand', value: 'expand' },
  { label: 'solid', value: 'solid' },
]
export const lineNumbersEnums: any = [
  { label: 'on', value: 'on' },
  { label: 'off', value: 'off' },
  { label: 'relative', value: 'relative' },
  { label: 'interval', value: 'interval' },
]
export const editorMatchBracketsEnums = [
  { label: 'never', value: 'never' },
  { label: 'near', value: 'near' },
  { label: 'always', value: 'always' },
]
export const editorShowFoldingControlsEnums = [
  { label: 'always', value: 'always' },
  { label: 'never', value: 'never' },
  { label: 'mouseover', value: 'mouseover' },
]
export const tabCompletionEnums = [
  { label: 'on', value: 'on' },
  { label: 'off', value: 'off' },
  { label: 'onlySnippets', value: 'onlySnippets' },
]
export const autoWrapEnums = [
  { label: 'off', value: 'off' },
  { label: 'on', value: 'on' },
  { label: 'wordWrapColumn', value: 'wordWrapColumn' },
  { label: 'bounded', value: 'bounded' },
]
export default {
  modeEnums,
  languageEnums,
  themeEnums,
  disableEmums,
  autoIndentEnums,
  editorAutoClosingStrategyEnums,
  cursorBlinkingEnums,
  lineNumbersEnums,
  editorMatchBracketsEnums,
  editorShowFoldingControlsEnums,
  tabCompletionEnums,
  autoWrapEnums,
}