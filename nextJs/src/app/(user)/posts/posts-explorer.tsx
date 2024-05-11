import PostsList from '@/components/post-list/post-list'
import { useActions } from '@/hooks/useActions'
import { useFilters } from '@/hooks/useFilters'
import { IPostResponse } from '@/interfaces/post.interfaces'
import { PostService } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'

interface IPostsExplorerProps {
	initialPosts: IPostResponse
}
const PostsExplorer: FC<IPostsExplorerProps> = ({ initialPosts }) => {
	const { queryParams, updateQueryParams, isFilterUpdated } = useFilters()
	const { resetQueryParams } = useActions()
	const { data: postResponse, isLoading } = useQuery({
		queryKey: ['getPosts', queryParams],
		queryFn: () => PostService.getPosts(queryParams),
		initialData: initialPosts,
		enabled: isFilterUpdated,
	})

	useEffect(() => {
		return () => {
			resetQueryParams()
		}
	}, [])
	return (
		<div>
			<PostsList
				postResponse={postResponse}
				title={undefined}
				modal={undefined}
			/>
		</div>
	)
}

export default PostsExplorer
