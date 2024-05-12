import { IPost } from '@/interfaces/post.interfaces'
import { PostService } from '@/services/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { PropsWithChildren, type FC } from 'react'
import { toast } from 'sonner'

interface IPostItemProps {
	post: IPost
	isDelete?: boolean
}
const PostItem: FC<PropsWithChildren<IPostItemProps>> = ({
	post,
	children,
	isDelete,
}) => {
	const queryClient = useQueryClient()
	const { mutate: mutateDelete } = useMutation({
		mutationKey: ['deletePost'],
		mutationFn: (postId: number) => PostService.delete(postId),
		onSuccess: () => {
			toast.success('Ваш запит було успішно видалено')
			queryClient.invalidateQueries({ queryKey: ['getPostsByUser'] })
		},
		onError: () => {
			toast.error('Щось пішло не так')
		},
	})
	return (
		<div className='border rounded-lg overflow-hidden relative'>
			<img
				src={
					'https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg'
				}
				alt={''}
			/>
			<div className='p-4 space-y-3'>
				<div>{post.title}</div>
				<div>{post.user.phoneNumber}</div>
				<div className='text-secondary font-thin'>Кого шукають:</div>
				<p className='text-ellipsis line-clamp-2'>{post.description}</p>
				<div className='my-2'>{children}</div>
			</div>
			{isDelete && (
				<button
					className='absolute top-2 right-2 z-50'
					onClick={() => mutateDelete(post.id)}
				>
					<X />
				</button>
			)}
		</div>
	)
}

export default PostItem
