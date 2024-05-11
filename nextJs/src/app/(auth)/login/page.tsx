import { type NextPage } from 'next'
import AuthCard from '../AuthCard'
import AuthWrapper from '../AuthWrapper'
const LoginPage: NextPage = () => {
	return (
		<AuthWrapper>
			<AuthCard type='login' />
		</AuthWrapper>
	)
}

export default LoginPage
