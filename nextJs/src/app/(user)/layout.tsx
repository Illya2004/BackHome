import { PropsWithChildren } from 'react'
import Footer from './footer'
import Header from './header'

export default function UserLayout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
