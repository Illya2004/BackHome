import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { type FC } from 'react'
import { LoginForm } from './login/LoginForm'
import { RegisterForm } from './register/RegisterForm'
interface IAuthWrapperProps {
	type: 'login' | 'register'
}
const AuthCard: FC<IAuthWrapperProps> = ({ type }) => {
	const isLogin = type === 'login'
	return (
		<Card className='m-auto w-max absolute top-1/2 right-72 transform -translate-y-1/2 p-10'>
			{/* <CardHeader>
				<CardTitle>{isLogin ? 'Sign in' : 'Оберіть свою'}</CardTitle>
			</CardHeader> */}
			<CardContent>{isLogin ? <LoginForm /> : <RegisterForm />}</CardContent>
			<CardFooter className='flex justify-center'>
				{isLogin ? (
					<p>
						You are not registered?{' '}
						<Link
							className={buttonVariants({ variant: 'link' })}
							href={'/register'}
						>
							Sign Up
						</Link>
					</p>
				) : (
					<p>
						Ви вже маєте аккаунт?{' '}
						<Link className='text-' href={'/login'}>
							Увійдіть
						</Link>
					</p>
				)}
			</CardFooter>
		</Card>
	)
}

export default AuthCard
