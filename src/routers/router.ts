import {
	createRouter,
	createWebHashHistory,
	RouteRecordRaw
} from "vue-router";
import menuList from "./modules/menuList";
import errorRouter from "./modules/error";

export const routes: MyRouteRecordRaw[] = [
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component: () => import('@/views/login/index.vue'),
	// },
	{
		path: "/",
		redirect: "/home/index",
		name: "layout",
		component: () => import("@/layout/index.vue"),
		children: [
			...menuList,
			...errorRouter,
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes as RouteRecordRaw[],
	strict: true,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
