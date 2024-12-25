const menuList: Array<MyRouteRecordRaw> = [
	{
		path: "/home/index",
		name: "home",
		component: () => import("@/views/home/index.vue"),
		type: 'menu',
		meta: {
			title: "首页",
			icon: "FaHome",
			alert: "个人网站，最低配置，资源加载比较慢，可能会出现点击 在线演示 加载太慢，请耐心等待十几秒就ok!"
		}
	},
	{
		path: "/codemirror/index",
		name: "codemirror",
		component: () => import("@/views/codemirror/index.vue"),
		type: 'menu',
		meta: {
			title: "代码编辑器",
			isOnlyOneTab: true,
			icon: "FaHome",
			alert: "个人网站，最低配置，资源加载比较慢，可能会出现输入 amoayun 无法出现自定义提示语，请耐心等待资源加载完成后重新输入，即可看到自定义提示!"
		}
	}
]

export default menuList;

