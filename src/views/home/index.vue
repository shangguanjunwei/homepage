<template>
	<div class="home">
		<div class="grid-demo">
			<div v-for="(item, index) in list" :key="index">
				<a-link @click="handleJumpTo('demo', item.demo_url)" :hoverable="false">
					<a-card :title="item.title">
						<template #extra>
							<a-link @click.stop="handleJumpTo('demo', item.demo_url)" :hoverable="false">
								在线演示
							</a-link>
							<a-divider direction="vertical" />
							<a-tooltip content="github">
								<a-link @click.stop="handleJumpTo('github', item.git_url)" :hoverable="false">
									<icon-github />
								</a-link>
							</a-tooltip>
						</template>
						<ol>
							<li v-for="(descImte, descIndex) in item.desc" :key="descIndex">
								<p>{{ descImte }}</p>
							</li>
						</ol>
					</a-card>
				</a-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="home">
import { get_project_list } from '@/api/modules/baseApi';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const list = ref<any>([]);
onMounted(async () => {
	const res = await get_project_list();
	list.value = res.data;
});
const handleJumpTo = (type: string, url: string) => {
	type === 'demo' && router.push(url);
	type === 'github' && window.open(url);
};
</script>

<style scoped lang="less">
.home {
	box-sizing: border-box;
	overflow: hidden;

	.grid-demo {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
	}
}
</style>
