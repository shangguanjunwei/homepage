import createInstance from "./createHttp";

export const apiHttp = createInstance({});

export const post =
  (url: string, params: any = {}, config?: any) => apiHttp.post(url, params, config);
export const get =
  (url: string, params: any = {}, config?: any) => apiHttp.get(url, { params, ...config });

export default { post, get };