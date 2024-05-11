import { instanceWithAuthV2 } from '@/api/interceptors'
import { IUser } from '@/interfaces/user.interfaces'

export const UserService = {
	async profile() {
		const response = await instanceWithAuthV2.get<IUser>('/profile/user/')
		return response.data
	},
	// async updateProfile(data: IEditProfileForm) {
	// 	const response = await instanceWithAuthStas.put('/profile/edit', data)
	// 	return response.data
	// },
	// async changePassword(email: string) {
	// 	const response = await instanceWithAuthStas.post('/profile/password', {
	// 		email,
	// 	})
	// 	return response.data
	// },
}
