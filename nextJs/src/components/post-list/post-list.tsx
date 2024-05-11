'use client'
import { EnumRole } from '@/enums/role.enum'
import { useFilters } from '@/hooks/useFilters'
import { IPost, IPostResponse } from '@/interfaces/post.interfaces'
import { type FC, type ReactNode } from 'react'
import Pagination from '../pagination/Pagination'
import PostItem from './post-item/post-item'

interface IPostsListProps {
	postResponse: IPostResponse
	title: ReactNode
	deletePost?: (postId: number) => void
	modal: ReactNode
	isPagination?: boolean
	updatePost?: (post: IPost) => void
}
const PostsList: FC<IPostsListProps> = ({
	postResponse,
	title,
	modal,
	updatePost,
	isPagination = true,
}) => {
	const { queryParams, updateQueryParams } = useFilters()

	// const pagesCount = queryParams.limit
	// 	? Math.ceil(postResponse.count / +queryParams.limit)
	// 	: 0
	const posts: IPost[] = [
		{
			id: 1,
			title: 'Заголовок першого допису',
			description: 'Опис першого допису dsa dsa dsa dsa dsa das',
			locationName: 'Місце першого допису',
			creationDate: '2024-05-11',
			lostDate: '2024-05-10',
			image: 'URL_першого_зображення',
			user: {
				username: 'user1',
				phoneNumber: '123456789',
				email: 'user1@example.com',
				role: EnumRole.CREATOR,
			},
		},
		{
			id: 2,
			title: 'Заголовок другого допису',
			description: 'Опис другого допису dsa dsa dsa  dsa dsa dsa',
			locationName: 'Місце другого допису',
			creationDate: '2024-05-10',
			lostDate: '2024-05-09',
			image: 'URL_другого_зображення',
			user: {
				username: 'user2',
				phoneNumber: '987654321',
				email: 'user2@example.com',
				role: EnumRole.VOLUNTEER,
			},
		},
		{
			id: 1,
			title: 'Заголовок першого допису',
			description:
				'Опис першого допису dsadsads dsadsad dsadsad dsadsa dsa dsad',
			locationName: 'Місце першого допису',
			creationDate: '2024-05-11',
			lostDate: '2024-05-10',
			image: 'URL_першого_зображення',
			user: {
				username: 'user1',
				phoneNumber: '123456789',
				email: 'user1@example.com',
				role: EnumRole.CREATOR,
			},
		},
		{
			id: 2,
			title: 'Заголовок другого допису',
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor aut, excepturi incidunt voluptates eveniet illum quo quasi quos quae voluptatem rem dolorem officia numquam mollitia reiciendis debitis adipisci asperiores esse.',
			locationName: 'Місце другого допису',
			creationDate: '2024-05-10',
			lostDate: '2024-05-09',
			image: 'URL_другого_зображення',
			user: {
				username: 'user2',
				phoneNumber: '987654321',
				email: 'user2@example.com',
				role: EnumRole.VOLUNTEER,
			},
		},
	]
	return (
		<div className='w-full col-span-2'>
			<div className='my-5 gap-3 grid lg:grid-cols-3 md:grid-cols-2 mx-auto w-3/4 xl:grid-cols-4'>
				{title}
				{postResponse.posts.map(post => (
					<PostItem post={post} key={post.id} />
				))}
			</div>
			{isPagination && pagesCount > 1 && (
				<Pagination
					updatePage={page => updateQueryParams('page', page.toString())}
					currentPage={queryParams.page}
					numberPages={pagesCount}
				/>
			)}
		</div>
	)
}

export default PostsList
