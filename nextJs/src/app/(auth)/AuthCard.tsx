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
		<Card className='h-max text-center md:w-[450px] md:top-1/2 absolute md:right-72 transform md:-translate-y-1/2 p-10 bottom-5 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-96 max-sm:w-80 max-sm:p-5'>
			<CardContent>{isLogin ? <LoginForm /> : <RegisterForm />}</CardContent>
			<CardFooter className='flex justify-center'>
				{isLogin ? (
					<p>
						Вперше на нашому сайті? Зареєструйтесь{' '}
						<Link className='text-primary' href={'/register'}>
							Реєстрація
						</Link>
					</p>
				) : (
					<p>
						Ви вже маєте аккаунт?{' '}
						<Link className='text-primary' href={'/login'}>
							Увійдіть
						</Link>
					</p>
				)}
			</CardFooter>
		</Card>
	)
}

export default AuthCard
