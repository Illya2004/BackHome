import { getAccessToken, removeFromStorage } from '@/services/token.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helper'

const options: CreateAxiosDefaults = {
	baseURL: 'http://10.4.57.28:8080/v1',
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

instanceWithAuthV1.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				//await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
				}
				removeFromStorage()
			}
		}
	}
)
instanceWithAuthV2.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instanceWithAuthV2.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				//await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
				}
				removeFromStorage()
			}
		}
	}
)
