import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data: profile, isLoading } = useQuery({
		queryKey: ['getProfile'],
		queryFn: UserService.profile,
	})
	return { profile, isLoading }
}
