import Image from 'next/image'
import { type FC } from 'react'
import image from '../assets/images/logo.svg'
const Logo: FC = () => {
	return (
		<div>
			<Image width={100} height={50} src={image} alt={''} />
		</div>
	)
}

export default Logo
