import { EnumRole } from '@/enums/role.enum'

export interface IUser {
	id: number
	email: string
	name: string
	phoneNumber: string
	role: EnumRole
}

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
	errorLogin: string | null
	errorRegister: string | null
	isSuccessLogin: boolean | null
	isSuccessRegister: boolean | null
}
export interface IEditProfileForm {
	name: string
	password: string
	newPassword: string
	phoneNumber: string
}
