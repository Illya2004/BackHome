import { IUser } from './user.interfaces'

export interface ITokens {
	token: string
}
export interface ILogin {
	email: string
	password: string
}
export interface IRegister extends ILogin {
	name: string
	phoneNumber: string
	role: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
