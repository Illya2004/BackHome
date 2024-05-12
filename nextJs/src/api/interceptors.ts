import { getAccessToken } from '@/services/token.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { getContentType } from './api.helper'

const options: CreateAxiosDefaults = {
	baseURL: 'https://api.back-home.pp.ua/v1',
	headers: getContentType(),
	withCredentials: true,
}
const optionsV2: CreateAxiosDefaults = {
	baseURL: 'https://api.back-home.pp.ua/v2',
	headers: getContentType(),
	withCredentials: true,
}
export const instance = axios.create(options)
export const instanceWithAuthV1 = axios.create(options)
export const instanceWithAuthV2 = axios.create(optionsV2)

instanceWithAuthV1.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instanceWithAuthV2.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})
