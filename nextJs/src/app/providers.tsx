'use client'
import { Toaster } from '@/components/ui/sonner'
import { store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			})
	)
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}
