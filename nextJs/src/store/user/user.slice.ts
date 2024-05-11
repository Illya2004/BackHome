import { EnumToken } from '@/enums/token.enum'
import { IInitialState as IUserInitialState } from '@/interfaces/user.interfaces'
import { getLocalStorage } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit/react'
import { login, logout, register } from './user.actions'

const initialState: IUserInitialState = {
	user: getLocalStorage(EnumToken.USER),
	isLoading: false,
	errorLogin: null,
	errorRegister: null,
	isSuccessLogin: null,
	isSuccessRegister: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//register
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.isSuccessRegister = true
				state.errorRegister = null
			})
			.addCase(register.rejected, (state, { error }) => {
				state.isLoading = false
				state.errorRegister = error.message ? 'Something went wrong' : null
			})

		//login
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
				state.errorLogin = null
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
				state.errorRegister = null
				state.errorLogin = null
				state.isSuccessLogin = true
			})
			.addCase(login.rejected, (state, { error }) => {
				state.isLoading = false
				state.user = null
				state.errorLogin = error.message
					? 'Email or password is incorrect'
					: null
			})

		//logout
		builder.addCase(logout.fulfilled, state => {
			state.isLoading = false
			state.user = null
			state.errorLogin = null
			state.errorRegister = null
			state.isSuccessRegister = null
			state.isSuccessLogin = null
		})
	},
})
