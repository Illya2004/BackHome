'use client'
import { buttonVariants } from '@/components/ui/button'
import { useActions } from '@/hooks/useActions'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'
import { User, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { headerUserData } from './header-user.data'
const HeaderUser: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { logout } = useActions()
	const { profile } = useProfile()
	const { push } = useRouter()
	const handleMenuItemClick = (url?: string) => {
		if (url) {
			push(url)
		} else {
			logout()
		}
		setIsShow(false)
	}

	return (
		<div>
			<div>
				{profile ? (
					<button onClick={() => setIsShow(!isShow)}>
						<User size={40} />
					</button>
				) : (
					<div className='space-x-5'>
						<Link
							href={'/register'}
							className={buttonVariants({ variant: 'outline' })}
						>
							Реєстрація
						</Link>
						<Link
							href={'/login'}
							className={buttonVariants({ variant: 'default' })}
						>
							Вхід
						</Link>
					</div>
				)}
			</div>
			{isShow && (
				<ul
					ref={ref}
					className='border rounded-xl p-3 pr-10 w-32 absolute right-20 bg-white shadow-md'
				>
					{headerUserData.map(data => (
						<li
							onClick={() => handleMenuItemClick(data.url)}
							className='cursor-pointer'
						>
							{data.label}
						</li>
					))}

					<button
						className='absolute top-1 right-1'
						onClick={() => setIsShow(!isShow)}
					>
						<X size={20} />
					</button>
				</ul>
			)}
		</div>
	)
}

export default HeaderUser
