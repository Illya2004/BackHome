import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import image from '../assets/images/logo.svg'
const Logo: FC = () => {
	return (
		<div>
			<Link href={'/'}>
				<Image width={100} height={50} src={image} alt={''} />
			</Link>
		</div>
	)
}

export default Logo
