import { get } from '../http/index';

export const get_project_list = () => get('/prolist.json')