'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AuthService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const formSchema = z.object({
	email: z.string().email({ message: 'Email invalid format.' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters.' }),
})

export function LoginForm() {
	const [isShowPass, setIsShowPass] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const { mutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: z.infer<typeof formSchema>) =>
			AuthService.auth('login', data),
		onSuccess: () => {},
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='name@example.com' type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className='flex gap-2'>
									<Input
										placeholder='*********'
										type={isShowPass ? 'text' : 'password'}
										{...field}
									/>
									<button
										type='button'
										onClick={() => setIsShowPass(!isShowPass)}
									>
										{!isShowPass ? <Eye /> : <EyeOff />}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full mt-3'>
					Submit
				</Button>
			</form>
		</Form>
	)
}
