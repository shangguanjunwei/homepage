<template>
  <div>
    <a-form :model="{}" auto-label-width>
      <a-form-item label="自定义提示">
        <a-textarea v-model="suggest" placeholder="请输入" :auto-size="{ minRows: 4 }" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handelUpdate">设置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as monaco from 'monaco-editor'
import { Notification } from '@arco-design/web-vue';
const diySuggest = defineModel({ required: true, type: Array, default: () => ([]) })
const baseData: monaco.languages.CompletionItem[] = [
  {
    label: 'amoayun',
    kind: 17,
    insertText: '// hello, 我是 amoayun，非常开心能使用我开发的工具，好用的话就推荐给朋友吧！',
    detail: 'amoayun',
    documentation: 'hello, 我是 amoayun，非常开心能使用我开发的工具，好用的话就推荐给朋友吧！'
  }
] as monaco.languages.CompletionItem[]
const suggest = ref<string>(JSON.stringify(baseData, null, 4))
const handelUpdate = () => {
  try {
    const list = JSON.parse(suggest.value)
    if (Array.isArray(list)) {
      diySuggest.value = list;
      Notification.success({
        title: '提示',
        content: '设置成功，快去试试吧'
      })
      return
    }
    throw Error('自定义提示数据格式错误')
  } catch (error: any) {
    Notification.error({
      title: '错误',
      content: error.message
    })
  }
}
</script>

<style scoped lang="less"></style>