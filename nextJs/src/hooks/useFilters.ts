import { IFilterData } from '@/interfaces/filter.interfaces'
import { useTypedSelector } from '@/store/store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useActions } from './useActions'

export const useFilters = () => {
	const pathName = usePathname()
	const searchParams = useSearchParams()
	const { updateQueryParam } = useActions()
	const { replace } = useRouter()

	const { queryParams, isFilterUpdated } = useTypedSelector(
		state => state.filters
	)

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({ key: key as keyof IFilterData, value })
		})
	}, [searchParams])

	useEffect(() => {
		if (searchParams.get('page') === null) updateQueryParams('page', '1')
	}, [])

	const updateQueryParams = (key: keyof IFilterData, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString())
		if (value) {
			if (key !== 'page') newParams.set('page', '1')
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		replace(pathName + `?${newParams.toString().replace(/%7C/g, '|')}`)
		updateQueryParam({ key, value })
	}

	return { updateQueryParams, queryParams, isFilterUpdated }
}
