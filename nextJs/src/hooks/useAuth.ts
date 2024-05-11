import { useTypedSelector } from '@/store/store'

export const useAuth = () => useTypedSelector(state => state.user.user)
