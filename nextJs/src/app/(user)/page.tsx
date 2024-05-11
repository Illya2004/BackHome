import PostsList from '@/components/post-list/post-list'
import { buttonVariants } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { EnumFilterDate } from '@/interfaces/filter.interfaces'
import { cn } from '@/lib/utils'
import { PostService } from '@/services/post.service'
import Link from 'next/link'
export async function getPosts(data: any) {
	const response = await PostService.getPosts(data)
	return response
}

async function HomePage() {
	const postsResponse = await getPosts({
		limit: 5,
		page: 1,
		date: EnumFilterDate.asc,
	})
	// const { data: postsResponse } = useQuery({
	// 	queryKey: ['getPosts'],
	// 	queryFn: () => PostService.getPosts({ limit: 5, page: 1 }),
	// })
	return (
		<main>
			<div className='text-center space-y-5 '>
				<Heading className='text-4xl'>
					Back<span className='text-primary'>Home</span>{' '}
				</Heading>
				<p className=''>
					Ітерактивна платформа для координації пошуку людей у зоні бойови дій
				</p>
			</div>
			{postsResponse && (
				<PostsList
					postResponse={postsResponse}
					title={undefined}
					modal={undefined}
				/>
			)}
			<div className='flex justify-center'>
				<Link
					href={'/posts'}
					className={cn('mx-auto', buttonVariants({ variant: 'outline' }))}
				>
					Дивитися всі
				</Link>
			</div>
		</main>
	)
}

export default HomePage
