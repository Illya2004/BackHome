'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { EnumRole } from '@/enums/role.enum'
import AuthService from '@/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import creator from '../../../assets/images/creator.svg'
import volunteer from '../../../assets/images/volunteer.svg'

const formSchema = z
	.object({
		name: z.string().min(2),
		phoneNumber: z.string(),
		role: z.string(),
		email: z.string().email({ message: 'Email invalid format.' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters.' }),
		confirmPassword: z.string().min(8),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export function RegisterForm() {
	const [isShowPass, setIsShowPass] = useState(false)
	const [isShowConfPass, setIsShowConfPass] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const fors = useFormContext()
	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: z.infer<typeof formSchema>) =>
			AuthService.auth('register', data),
		onSuccess: () => {
			toast.success('You registered successfully!')
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values)
	}
	console.log(form.watch())
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{!form.watch('role') ? (
					<div className='space-y-5'>
						<h1 className='text-3xl font-bold'>Оберіть свою роль</h1>
						<FormField
							control={form.control}
							name='role'
							render={({ field: { onChange, ...rest } }) => (
								<FormItem>
									<FormControl>
										<div className='flex gap-5'>
											<button
												type='button'
												onClick={() => onChange(EnumRole.VOLUNTEER)}
												{...rest}
											>
												<Image
													src={volunteer}
													alt='Volunteer'
													width={200}
													height={500}
												/>
											</button>
											<button
												onClick={() => onChange(EnumRole.CREATOR)}
												type='button'
												{...rest}
											>
												<Image
													src={creator}
													alt='Creator'
													width={200}
													height={500}
												/>
											</button>
										</div>
									</FormControl>
									<FormDescription></FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				) : (
					<div className='space-y-3'>
						<Heading>Вперше на нашому сайті? </Heading>
						<Heading>Зареєструйтесь!</Heading>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Ім'я та прізвище" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Пошта' type='email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Номер телефону' {...field} />
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
									<FormControl>
										<div className='flex gap-2'>
											<Input
												placeholder='Пароль'
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
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex gap-2'>
											<Input
												placeholder='Підтвердіть пароль'
												type={isShowConfPass ? 'text' : 'password'}
												{...field}
											/>
											<button
												type='button'
												onClick={() => setIsShowConfPass(!isShowConfPass)}
											>
												{!isShowConfPass ? <Eye /> : <EyeOff />}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Add other form fields similarly */}
						<Button type='submit' className='w-full mt-3'>
							Submit
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}
