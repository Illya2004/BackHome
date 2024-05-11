import { EnumFilterDate } from '@/interfaces/filter.interfaces'
import { getPosts } from '../page'
import PostsExplorer from './posts-explorer'

async function Posts() {
	const postsResponse = await getPosts({
		limit: 5,
		page: 1,
		date: EnumFilterDate.asc,
	})

	return (
		<div>
			<PostsExplorer initialPosts={postsResponse} />
		</div>
	)
}

export default Posts
