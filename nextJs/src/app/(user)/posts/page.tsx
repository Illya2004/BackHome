import Heading from '@/components/ui/heading'
import PostsExplorer from './posts-explorer'
import Sort from './sort'

function Posts(params: any) {
	// const postsResponse = await getPosts({
	// 	limit: 4,
	// 	page: 1,
	// 	//date: EnumFilterDate.asc,
	// })

	return (
		<div>
			<div className='flex justify-between px-20'>
				<Heading>Всі запити</Heading>
				<Sort />
			</div>
			<div className='px-20'>
				<PostsExplorer />
			</div>
		</div>
	)
}

export default Posts
