'use client'
import PostItem from '@/components/post-list/post-item/post-item'
import PostsList from '@/components/post-list/post-list'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { EnumRole } from '@/enums/role.enum'
import { useProfile } from '@/hooks/useProfile'
import { PostService } from '@/services/post.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { LazyMap } from '../../page'
function PostPage({ params }: any) {
	const { profile, isLoading: isProfileLoading } = useProfile()
	const { data: post, isLoading } = useQuery({
		queryKey: ['getPost'],
		queryFn: () => PostService.getPostById(+params.id),
	})
	const { data: postResponse } = useQuery({
		queryKey: ['getPosts'],
		queryFn: () => PostService.getPosts({ limit: 4, page: 1 }),
	})
	const { mutate } = useMutation({
		mutationKey: ['help'],
		mutationFn: (postId: number) => PostService.toggleHelp(postId),
		onError: () => {
			toast.error('Ви не можете давати відгук на запити ')
		},
	})

	return (
		<div className='px-20'>
			<Heading>Розшукується</Heading>
			{!isLoading && post && (
				<div className='flex w-full gap-10'>
					<PostItem post={post}>
						<Button className='w-full' onClick={() => mutate(post.id)}>
							Допомогти
						</Button>
					</PostItem>
					<LazyMap
						onClick={undefined}
						style={{ width: '100%', height: '500px' }}
						coords={post.locationCoords}
					/>
				</div>
			)}
			{postResponse && !isProfileLoading && (
				<>
					<div className='font-bold text-3xl'>
						{profile?.role === EnumRole.CREATOR
							? 'Ваші створені заявки'
							: 'Запити на які ви відгукнулись'}
					</div>
					<PostsList isPagination={false} postResponse={postResponse} />
				</>
			)}
		</div>
	)
}

export default PostPage
