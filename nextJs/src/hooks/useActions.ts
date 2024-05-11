import { rootActions } from '@/store/root-actions'
import { useAppDispatch } from '@/store/store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

export const useActions = () => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
