<template>
  <div>
    <a-form :model="editorPropsFormData" auto-label-width>
      <a-form-item label="模式">
        <template #extra>
          <div>没有值的情况下默认为 base</div>
        </template>
        <a-select v-model="editorPropsFormData.mode" :trigger-props="{ autoFitPopupMinWidth: true }" allow-clear
          :options="enums.modeEnums" />
      </a-form-item>
      <a-form-item label="语言">
        <template #extra>
          <div>没有值的情况下默认为 javascript</div>
        </template>
        <a-select v-model="editorPropsFormData.language" :options="enums.languageEnums" allow-clear allow-search />
      </a-form-item>
      <a-form-item label="主题">
        <template #extra>
          <div>没有值的情况下默认为 vs-dark</div>
        </template>
        <a-select v-model="editorPropsFormData.theme" :options="enums.themeEnums" allow-clear />
      </a-form-item>
      <a-form-item label="disabled">
        <template #extra>
          <div>
            <div>当模式为 base 时，disabled 类型应为 boolean</div>
            <div>当模式为 diff 时，disabled 类型应为 [boolean, boolean]</div>
          </div>
        </template>
        <a-select v-model="disabled" placeholder="请选择" :trigger-props="{ autoFitPopupMinWidth: true }" allow-clear>
          <a-option :value="1">true</a-option>
          <a-option :value="2">false</a-option>
          <a-option :value="3">true,true</a-option>
          <a-option :value="4">true,false</a-option>
          <a-option :value="5">false,true</a-option>
          <a-option :value="6">false,false</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="placeholder">
        <a-input v-model="editorPropsFormData.placeholder" allow-clear />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import enums from '../enums';
import { ref, watch } from 'vue';
const editorPropsFormData: any = defineModel({ required: true, type: Object, default: () => ({}) })
const disabled = ref(2)
watch(() => disabled.value, (newVal) => {
  const obj: any = {
    1: true,
    2: false,
    3: [true, true],
    4: [true, false],
    5: [false, true],
    6: [false, false],
  }
  editorPropsFormData.value.disabled = obj[newVal] || false
})
watch(() => editorPropsFormData.value.mode, (newVal) => {
  if (newVal === 'base' || !newVal) {
    disabled.value = 2
    return
  }
  if (newVal === 'diff') {
    disabled.value = 6
    return
  }
})
</script>

<style scoped></style>