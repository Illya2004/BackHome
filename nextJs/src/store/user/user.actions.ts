import { IAuthResponse, ILogin, IRegister } from '@/interfaces/auth.interfaces'
import AuthService from '@/services/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk<IAuthResponse, IRegister>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			return await AuthService.auth('register', data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)
export const login = createAsyncThunk<IAuthResponse, ILogin>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			return await AuthService.auth('login', data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/', async (_, thunkApi) => {
	try {
		return await AuthService.logout()
	} catch (error) {
		return thunkApi.rejectWithValue(error)
	}
})
