import { EnumRole } from '@/enums/role.enum'

export interface IPost {
	id: number
	title: string
	description: string
	locationCoords: string
	creationDate: string
	lostDate: string
	image: string
	user: {
		username: string
		phoneNumber: string
		email: string
		role: EnumRole
	}
}
export interface ICreatePost extends Omit<IPost, 'id' | 'user'> {}
export interface IPostCategory {
	id: number
	name: string
}
export interface IPostResponse {
	posts: IPost[]
	count: number
}

export interface IPostsUserResponse {
	requestsCount: number
	requests: IPost[]
}
