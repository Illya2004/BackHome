'use client'
import { useFilters } from '@/hooks/useFilters'
import { IPostResponse } from '@/interfaces/post.interfaces'
import Link from 'next/link'
import { type FC } from 'react'
import Pagination from '../pagination/Pagination'
import { Button } from '../ui/button'
import PostItem from './post-item/post-item'

interface IPostsListProps {
	postResponse: IPostResponse
	isPagination?: boolean
	isDelete?: boolean
}
const PostsList: FC<IPostsListProps> = ({
	postResponse,
	isDelete,
	isPagination = true,
}) => {
	const { queryParams, updateQueryParams } = useFilters()

	const pagesCount = queryParams.limit
		? Math.ceil(postResponse.count / +queryParams.limit)
		: 0
	return (
		<div className='w-full col-span-2'>
			<div className='my-5 gap-3 grid lg:grid-cols-3 md:grid-cols-2 mx-auto xl:grid-cols-4'>
				{postResponse.posts.map(post => (
					<>
						<PostItem post={post} key={post.id} isDelete={isDelete}>
							<Link href={`/post/${post.id}`}>
								<Button className='w-full'>Показати більше</Button>
							</Link>
						</PostItem>
					</>
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
