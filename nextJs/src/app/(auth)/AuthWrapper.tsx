import { type FC, type PropsWithChildren } from 'react'
const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<img
				src='https://war.ukraine.ua/wp-content/uploads/2022/03/124__Grief-of-Kyiv-residents-after-a-Russian-missile-strike-on-a-residential-area-in-Sviatoshynsky-district-15-March-2022-By-Aris-Messins.jpg'
				className='h-screen'
			/>
			{children}
		</div>
	)
}

export default AuthWrapper
