import * as monaco from 'monaco-editor';
// 注册自定义语法
const registeProvider = (language: string, constValues: monaco.languages.CompletionItem[]) => {
  const monacoProvider = monaco.languages.registerCompletionItemProvider(
    language,
    {
      provideCompletionItems: () => {
        const suggestions: any[] = constValues.filter(item => item.label).map((item) => {
          return {
            label: item.label,
            kind: item.kind || 17,
            insertText: item.insertText || item.label || '',
            detail: item.detail || '',
            documentation: item.documentation || ''
          }
        })
        return { suggestions }
      }
    }
  )
  return monacoProvider;
}

export default registeProvider;