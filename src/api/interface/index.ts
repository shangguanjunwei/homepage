// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	message: string;
	msg: string;
	success?: boolean;
	timestamp?: number;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	list: T[];
	pageNum?: number;
	pageSize?: number;
	total: number;
	[propName: string]: any;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录模块
export namespace Login {
	export interface ReqSSOLigin {
		jwtToken: string;
		userName: string;
	}
}

//  * dialog
export interface DialogExpose {
	acceptParams: (params: any) => void;
}

// * 用户管理模块
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		keyword: string;
		role: number;
	}
	export interface ResUserList {
		_id: string;
		userName: string;
		displayName: string;
		email: string;
		role: string[];
		mobile?: string;
		operator: string;
		createdAt: string;
		updatedAt: string;
		pwd: string;
	}
}

// 角色管理模块
export namespace Role {
	export interface ReqGetRoleParams extends ReqPage {
		keyword?: string;
	}
	export interface ResRoleList {
		_id: string;
		roleName: string;
		createdAt: string;
		updatedAt: number;
		operator: string;
		resource: string[];
	}
}

// 资源关联模块
export namespace Resource {
	export interface ResourceItem {
		_id: string;
		children?: ResourceItem[];
		component: string;
		hidden: boolean;
		meta: {
			icon: string;
			affix: boolean;
		};
		name: string;
		parentId?: string | null;
		type: string;
		url: string;
		icon: string;
	}
	export interface ResourceResult extends Result {
		tree: ResourceItem[];
	}
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}
