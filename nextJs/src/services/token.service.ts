import { EnumToken } from '@/enums/token.enum'
import { ITokens } from '@/interfaces/auth.interfaces'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumToken.TOKEN)
	return accessToken || null
}
export const getUser = () => {
	const accessToken = Cookies.get(EnumToken.USER)
	return accessToken || null
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(EnumToken.TOKEN, data.token)
}
export const removeFromStorage = () => {
	Cookies.remove(EnumToken.TOKEN)
	localStorage.removeItem(EnumToken.USER)
}

export const saveToStorage = (data: any) => {
	saveTokensStorage(data)
	localStorage.setItem(EnumToken.USER, JSON.stringify(data.user))
}
