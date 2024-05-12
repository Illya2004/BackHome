import { instanceWithAuthV1, instanceWithAuthV2 } from '@/api/interceptors'
import { type IFilterData } from '@/interfaces/filter.interfaces'
import { ICreatePost, IPost, IPostResponse } from '@/interfaces/post.interfaces'

export const PostService = {
	async getPosts(data: { date?: string; page: number; limit: number }) {
		const response = await instanceWithAuthV1.get<
			IFilterData,
			{ data: IPostResponse }
		>('/posts/', { params: data })
		return response.data
	},
	async getPostById(postId: number | null) {
		const response = await instanceWithAuthV2.get<IPost>(`/posts/${postId}`)
		return response.data
	},
	async createPost(data: ICreatePost) {
		const response = await instanceWithAuthV1.post<
			ICreatePost,
			{ data: IPost }
		>('/posts/', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},
	async updateImage(formData?: FormData, postId?: number) {
		const response = await instanceWithAuthV1.put(
			`/posts/${postId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response.data
	},
	async toggleHelp(postId: number) {
		const response = await instanceWithAuthV2.post(`/posts/help/${postId}`)
		return response.data
	},
	async getAllPostByUser(params: { page: number; limit: number }) {
		const response = await instanceWithAuthV2.get('/posts/user/', {
			params,
		})
		return response.data
	},
	async delete(postId: number) {
		const response = await instanceWithAuthV2.delete(`posts/delete/${postId}`)
		return response.data
	},
}
