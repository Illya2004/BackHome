import Logo from '@/components/logo'
import { type FC } from 'react'
const Footer: FC = () => {
	return (
		<div className='grid grid-cols-2 px-20 bg-[#E8F0FB] py-10 mt-5 '>
			<Logo />
			<p>
				Онлайн платформа де люди можуть виставляти зниклих осіб, а волонтери та
				рятувальники допомагати їх знаходити
			</p>
		</div>
	)
}

export default Footer
