<template>
	<a-layout class="layout-demo">
		<!-- 顶部header -->
		<a-layout-header>
			<Header />
		</a-layout-header>

		<a-layout-content>
			<a-alert type="warning" banner center>
				{{ alertContent }}
			</a-alert>
			<div class="content-box-out">
				<!-- 内容区域 -->
				<div id="my-fullscreen-content" class="content-box-inner">
					<a-spin v-bind="spinConfig" style="width: 100%;">
						<a-scrollbar id="basic-scrollbar" ref="scrollbarRef" :style="scrollBarStyle">
							<div class="main-content">
								<a-layout-content>
									<div id="my-fullscreen-content-inner" class="main-content-inner">
										<a-space fill direction="vertical" :size="40">
											<router-view v-slot="{ Component, route }">
												<Transition name="fade" mode="out-in">
													<keep-alive :include="cacheRouter">
														<component :is="Component" :key="route.meta.isOnlyOneTab ? route.path : route.fullPath">
														</component>
													</keep-alive>
												</Transition>
											</router-view>
											<div>
												<Footer />
											</div>
										</a-space>
									</div>
								</a-layout-content>
							</div>
						</a-scrollbar>
					</a-spin>
					<!-- 返回顶部 -->
					<a-back-top target-container="#basic-scrollbar"
						:style="{ position: 'absolute', right: '100px', bottom: '80px' }">
					</a-back-top>
				</div>
			</div>
		</a-layout-content>
	</a-layout>
</template>

<script setup lang="ts" name="layout">
import { computed, watch, ref } from 'vue';
import Header from './Header/index.vue';
import Footer from './Footer/index.vue';
import cacheRouter from "@/routers/cacheRouter";
import { useRoute } from "vue-router";
import { spinConfig } from "@/utils/jsComponent/JsSpin";
import JsFullScreen from '@/utils/jsComponent/JsFullScreen';

const scrollBarStyle = computed(() => {
	return {
		height: JsFullScreen.layoutScrollHeight.value,
		overflow: 'auto',
		backgroundColor: 'var(--color-bg-1)',
		position: 'relative',
		transition: 'height 0.3s',
	}
})
const scrollbarRef = ref<any>(null);
const route = useRoute();
const alertContent = computed(() => route.meta.alert || '个人网站，最低配置，资源加载比较慢')
watch(
	() => route.fullPath,
	() => {
		scrollbarRef.value && scrollbarRef.value.scrollTop(0);
	},
	{ immediate: true }
)
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.layout-demo {
	height: 100vh;
	background: var(--color-bg-1);

	.arco-layout-sider {
		background: var(--color-bg-1);
		box-shadow: none !important;
		border-right: 1px solid var(--color-neutral-3);
	}

	.arco-layout-header {
		padding: 0 24px;
		border-bottom: 1px solid var(--color-neutral-3);
		height: @header-height;
		line-height: @header-height;
		background-color: var(--color-bg-1);
		min-width: 1180px;
	}

	.content-box-out {
		width: 100%;
		height: calc(100vh - @header-height - @tabs-height - 40px);
		box-sizing: border-box;

		.tabs-box {
			height: @tabs-height;
			width: 100%;
			box-sizing: border-box;
		}

		.content-box-inner {
			height: calc(100vh - @header-height - @tabs-height - 40px);
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
			padding: 15px 0 15px 0;
			background: var(--color-bg-1);

			.main-content {
				box-sizing: border-box;
				min-height: calc(100vh - @header-height - @tabs-height - 30px - 40px);
				width: @main-content-width;
				margin: auto;

				.main-content-inner {
					background: var(--color-bg-1);
				}
			}
		}
	}
}
</style>
