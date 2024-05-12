'use client'
import PostsList from '@/components/post-list/post-list'
import { useActions } from '@/hooks/useActions'
import { useFilters } from '@/hooks/useFilters'
import { IPostResponse } from '@/interfaces/post.interfaces'
import { PostService } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'

interface IPostsExplorerProps {
	initialPosts?: IPostResponse
}
const PostsExplorer: FC<IPostsExplorerProps> = () => {
	const { queryParams, updateQueryParams, isFilterUpdated } = useFilters()
	const { resetQueryParams } = useActions()
	const { data: postResponse, isLoading } = useQuery({
		queryKey: ['getPosts-2', queryParams],
		queryFn: () => PostService.getPosts(queryParams),
		enabled: !!isFilterUpdated,
	})

	useEffect(() => {
		return () => {
			resetQueryParams()
		}
	}, [])
	return <div>{postResponse && <PostsList postResponse={postResponse} />}</div>
}

export default PostsExplorer
