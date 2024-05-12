import Logo from '@/components/logo'
import { type FC } from 'react'
import HeaderUser from './header-user/header-user'
const Header: FC = () => {
	return (
		<div className='flex justify-between items-center px-14 py-5'>
			<Logo />
			<HeaderUser />
		</div>
	)
}

export default Header
