import PostsList from '@/components/post-list/post-list'
import { buttonVariants } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { EnumFilterDate, IFilterData } from '@/interfaces/filter.interfaces'
import { cn } from '@/lib/utils'
import { PostService } from '@/services/post.service'
import dynamic from 'next/dynamic'
import Link from 'next/link'
// import LMap from '../../components/map/global-map'
export async function getPosts(data: IFilterData) {
	const response = await PostService.getPosts(data)
	return response
}

export const LazyMap = dynamic(() => import('../../components/map/map'), {
	ssr: true,
	loading: () => <p>Loading...</p>,
})
export const LMap = dynamic(() => import('../../components/map/global-map'), {
	ssr: true,
	loading: () => <p>Loading...</p>,
})
async function HomePage() {
	const postsResponse = await getPosts({
		limit: 4,
		page: 1,
		date: EnumFilterDate.asc,
	})

	return (
		<main>
			<div className='flex flex-col items-center space-y-5 my-10'>
				<Heading className='text-4xl'>
					Back<span className='text-primary'>Home</span>{' '}
				</Heading>
				<div className='text-center'>
					<p className='w-96'>
						Ітерактивна платформа для координації пошуку людей у зоні бойови дій
					</p>
				</div>
			</div>
			<div>
				<LMap />
			</div>
			{postsResponse && (
				<PostsList isPagination={false} postResponse={postsResponse} />
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

//mapbox://styles/tarashuledza/clw2qim8c02g001qr1axebpdx

//pk.eyJ1IjoidGFyYXNodWxlZHphIiwiYSI6ImNsdzJxa3E1YzBudjUyam1xZjBsM2o0N2gifQ.HeXeQ6ass6j0IIkBv2_JbA

//https://api.mapbox.com/styles/v1/tarashuledza/clw2qim8c02g001qr1axebpdx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGFyYXNodWxlZHphIiwiYSI6ImNsdzJxa3E1YzBudjUyam1xZjBsM2o0N2gifQ.HeXeQ6ass6j0IIkBv2_JbA
