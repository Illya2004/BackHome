import { instanceWithAuthV1, instanceWithAuthV2 } from '@/api/interceptors'
import { type IFilterData } from '@/interfaces/filter.interfaces'
import { ICreatePost, IPost, IPostResponse } from '@/interfaces/post.interfaces'

export const PostService = {
	async getPosts(data: IFilterData) {
		const response = await instanceWithAuthV1.get<
			IFilterData,
			{ data: IPostResponse }
		>('/posts/', { params: data })
		return response.data
	},
	async getPostById(postId: number | null) {
		const response = await instanceWithAuthV2.get<IPost>(`/requests/${postId}`)
		return response.data
	},
	async createPost(data: ICreatePost) {
		const response = await instanceWithAuthV1.post('/requests/create', data)
		return response.data
	},
	// async updatePost(postId: number | null, data: ICreatePost) {
	// 	const response = await instanceWithAuthV2.put(`/requests/edit/${postId}`, {
	// 		description: data.description,
	// 		location: data.location,
	// 		categories: data.categories,
	// 	})
	// 	return response
	// },
	// async deletePost(id: number) {
	// 	const response = await instanceWithAuthStas.delete(`/requests/delete/${id}`)
	// 	return response.data
	// },
	// async getAllPostsByUser() {
	// 	const response = await instanceWithAuthStas.get<IPostResponse>(
	// 		'/requests/user/',
	// 		{ params: { offset: 0, limit: 5 } }
	// 	)
	// 	return response.data
	// },
	// async addToFavorite(postId: number) {
	// 	const response = await instanceWithAuthStas.post(`/requests/like/${postId}`)
	// 	return response.data
	// },
}
