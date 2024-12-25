// 错误页面模块
const errorRouter: Array<MyRouteRecordRaw> = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			title: "403页面",
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			title: "404页面",
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			title: "500页面",
		}
	},
	// 没有匹配到的路由，重定向到404页面
	{
		path: "/:pathMatch(.*)*",
		redirect: "/404"
	}
];

export default errorRouter;
