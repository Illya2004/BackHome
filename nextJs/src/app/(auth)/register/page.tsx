import { type NextPage } from 'next'
import AuthCard from '../AuthCard'
import AuthWrapper from '../AuthWrapper'
const RegisterPage: NextPage = () => {
	return (
		<AuthWrapper>
			<AuthCard type='register' />
		</AuthWrapper>
	)
}

export default RegisterPage
