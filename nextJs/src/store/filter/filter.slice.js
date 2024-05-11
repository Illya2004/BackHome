import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isFilterUpdated: false,
	queryParams: {
		categories: '',
		location: '',
		page: 1,
		limit: 5,
	},
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		updateQueryParam: (state, action) => {
			const { key, value } = action.payload
			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetFilterUpdate: state => {
			state.isFilterUpdated = false
		},
		resetQueryParams: state => {
			state.queryParams = {
				categories: '',
				location: '',
				page: 1,
				limit: 5,
			}
		},
	},
})
