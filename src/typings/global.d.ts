// * Menu
declare namespace Menu {
	interface MenuOptions {
		url?: string;
		name?: string;
		path?: string;
		icon?: string;
		routerName?: string;
		children?: MenuOptions[];
		meta?: {
			icon?: string;
			requiresAuth?: boolean;
			affix?: boolean;
			title?: string;
		};
		hidden?: boolean;
		close?: boolean;
		component?: any;
		redirect?: string;
		fullPath?: string;
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

type MetaItem = {
	title: string;
	icon?: string;
	fullScreen?: {
		enable: boolean;
		padding?: boolean;
	};
	alert?: string;
	isOnlyOneTab?: boolean;
};
declare interface MyRouteRecordRaw {
	path: string;
	name?: string;
	component?: any;
	redirect?: string;
	meta?: MetaItem;
	children?: MyRouteRecordRaw[];
	type?: "action" | "menu" | "interface";
}
