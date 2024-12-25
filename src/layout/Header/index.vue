<template>
	<div class="header-box">
		<div>
			<div class="logo" @click="goHome" style="cursor: pointer;">
				{{ webTitle }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const webTitle = import.meta.env.VITE_GLOB_APP_TITLE || ''
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
	router.push('/');
};
</script>

<style lang="less" scoped>
.header-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: @main-content-width;
	margin: auto;

	.logo {
		font-size: 16px;
		font-weight: 700;
	}
}
</style>
