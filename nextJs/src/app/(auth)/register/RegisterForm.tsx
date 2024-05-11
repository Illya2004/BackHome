'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EnumRole } from '@/enums/role.enum'
import AuthService from '@/services/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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

	return (
		<Form {...form}>
			<form className='text-center'>
				{!form.watch('role') ? (
					<div className='space-y-5'>
						<h1 className='text-3xl font-bold'>Оберіть свою роль</h1>
						<FormField
							control={form.control}
							name='name'
							render={({ field: { onChange, ...rest } }) => (
								<FormItem>
									<FormControl>
										<div className='flex gap-5'>
											<button
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
					<>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ім'я та прізвище</FormLabel>
									<FormControl>
										<Input
											placeholder='name@example.com'
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Add other form fields similarly */}
						<Button type='submit' className='w-full mt-3'>
							Submit
						</Button>
					</>
				)}
			</form>
		</Form>
	)
}
