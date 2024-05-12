'use client'
import AddPost from '@/components/add-post/add-post'
import PostsList from '@/components/post-list/post-list'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Heading from '@/components/ui/heading'
import { useProfile } from '@/hooks/useProfile'
import { PostService } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { type FC } from 'react'
import EditProfile from './edit-profile'
import ProfileData from './profile-data'
const ProfilePage: FC = () => {
	const { profile, isLoading } = useProfile()
	const { data: postResponse, isLoading: isLoadingPost } = useQuery({
		queryKey: ['getPostsByUser'],
		queryFn: () => PostService.getAllPostByUser({ limit: 4, page: 1 }),
	})

	return (
		<div className='px-20 space-y-5'>
			<div className='flex'>
				<Heading className='text-4xl'>Мій профіль</Heading>
			</div>
			<div className='md:grid grid-cols-3 '>
				{!isLoading && <ProfileData user={profile} />}
				<EditProfile />
			</div>
			{!isLoadingPost && postResponse && (
				<>
					<div className='flex justify-between'>
						<Heading>Я відгукнувся</Heading>
						<Dialog>
							<DialogTrigger>
								<Plus />
							</DialogTrigger>
							<AddPost />
						</Dialog>
					</div>
					<PostsList
						postResponse={postResponse}
						isPagination={false}
						isDelete={true}
					/>
				</>
			)}
		</div>
	)
}

export default ProfilePage
