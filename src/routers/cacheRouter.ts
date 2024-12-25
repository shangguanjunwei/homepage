import { ref, toRaw } from "vue";
const cacheRouter = ref<any[]>([]);

// 移除keepAlive缓存
export const removeCacheRoute = (routeName: string) => {
	let index = cacheRouter.value.indexOf(routeName);
	if (index !== -1) {
		cacheRouter.value.splice(index, 1);
	}
};

export const addCacheRoute = (routeName: string) => {
	let index = cacheRouter.value.indexOf(routeName);
	if (index === -1) {
		cacheRouter.value.push(routeName);
	}
};

export default toRaw(cacheRouter);
