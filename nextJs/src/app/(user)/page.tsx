import { ModeToggle } from '@/components/theme-mode-toggle'
import { type NextPage } from 'next'
const HomePage: NextPage = () => {
	console.log(process.env.SERVER_V1_URL)
	return (
		<main>
			<ModeToggle />
		</main>
	)
}

export default HomePage
