<template>
  <a-config-provider :global="true" size="small" :locale="zhCN" :update-at-scroll="true" :scroll-to-close="true"
    :exchange-time="false">
    <a-watermark>
      <router-view></router-view>
    </a-watermark>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
</script>

<style scoped lang="less"></style>
