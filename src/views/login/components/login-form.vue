<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">
      {{ webTitle }}
    </div>
    <a-form size="large" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit" :rules="rules">
      <a-form-item field="username" :validate-trigger="['change', 'blur']" hide-label>
        <a-input v-model="userInfo.username">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :validate-trigger="['change', 'blur']" hide-label>
        <a-input-password v-model="userInfo.password" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item hide-label>
        <a-button html-type="submit" type="primary" long>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import JsMessage from '@/utils/jsComponent/JsMessage';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const webTitle = import.meta.env.VITE_GLOB_APP_TITLE || ''
const userInfo = reactive({
  username: '',
  password: '',
});
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
};
const router = useRouter();
const handleSubmit = async ({ errors }: { errors?: any, values: any; }) => {
  if (errors) return;
  JsMessage.success('登录成功');
  router.replace('/');
};
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 15px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>