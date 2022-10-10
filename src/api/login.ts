import { stringify } from 'query-string'

import fetchApi from 'utils/request'

export const fetchLogin=():Promise<any>=>fetchApi.get('getLogin/send')

export const fetchLoginVerifyCode=(params):Promise<any>=>fetchApi.post('getLogin/send',params)
