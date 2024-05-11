import { type FC, type PropsWithChildren } from 'react'
const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<div>
				<div className='absolute w-full h-full bg-black/50 hidden max-md:block'></div>
				<img
					src='https://war.ukraine.ua/wp-content/uploads/2022/03/124__Grief-of-Kyiv-residents-after-a-Russian-missile-strike-on-a-residential-area-in-Sviatoshynsky-district-15-March-2022-By-Aris-Messins.jpg'
					className='max-md:h-1/2 lg:h-screen object-cover'
				/>
			</div>
			{children}
		</div>
	)
}

export default AuthWrapper
