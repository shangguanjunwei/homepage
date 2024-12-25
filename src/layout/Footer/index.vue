<template>
  <div class="footer-content">
    <div class="inner">
      <div class="transition-color">
        Powered by shangguanjunwei ⓒ Copyright shangguanjunwei 2022-{{ dayjs().year() }}
      </div>
      <a-link class="transition-color" @click="goGovWeb" :hoverable="false" style="font-size: 14px;">
        京ICP备2022020189号-1
      </a-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const goGovWeb = () => window.open('https://beian.miit.gov.cn/#/Integrated/index')
</script>

<style scoped lang="less">
.footer-content {
  height: @footer-height;
  font-size: 14px;

  .inner {
    border-top: 1px solid var(--color-neutral-3);
    width: @main-content-width;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.transition-color {
  transition: color 0.3s;
  color: var(--color-text-3);

  &:hover {
    color: var(--color-text-1);
  }
}
</style>