import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { filtersSlice } from './filter/filter.slice.js'
import { userSlice } from './user/user.slice'

const persistConfig = {
	key: 'front-support',
	storage,
}

const reducer = combineReducers({
	user: userSlice.reducer,
	filters: filtersSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export const useAppDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
