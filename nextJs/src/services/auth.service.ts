import { instanceWithAuthV1 } from '@/api/interceptors'
import type {
	IAuthResponse,
	ILogin,
	IRegister,
} from '@/interfaces/auth.interfaces'
import { removeFromStorage, saveToStorage } from './token.service'

const AuthService = {
	async auth(type: 'login' | 'register', data: ILogin | IRegister) {
		const response = await instanceWithAuthV1.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)
		if (response.data.token) saveToStorage(response.data)
		return response.data
	},

	async logout() {
		removeFromStorage()
	},
}
export default AuthService
