import { Button } from '@/components/ui/button'
import { IPost } from '@/interfaces/post.interfaces'
import Link from 'next/link'
import { type FC } from 'react'

interface IPostItemProps {
	post: IPost
}
const PostItem: FC<IPostItemProps> = ({ post }) => {
	return (
		<div className='border rounded-lg overflow-hidden '>
			<Link href={`/post/${post.id}`}>
				<img
					src={
						'https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg'
					}
					alt={''}
				/>
				<div className='p-4 space-y-3'>
					<div className='text-xl'>{post.locationName}</div>
					<div className='text-secondary font-thin'>Кого шукають:</div>
					<p className='text-ellipsis line-clamp-2'>{post.description}</p>
					<Button>Показати більше</Button>
				</div>
			</Link>
		</div>
	)
}

export default PostItem
