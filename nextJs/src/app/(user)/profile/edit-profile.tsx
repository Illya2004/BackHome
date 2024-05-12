'use client'
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
import { useActions } from '@/hooks/useActions'
import { type IEditProfileForm } from '@/interfaces/user.interfaces'
import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
// const formSchema = z
// 	.object({
// 		password: z.string().optional(),
// 		newPassword: z
// 			.string()
// 			.optional()
// 			.refine((value, data) => !data.password || value !== '', {
// 				message: "Новий пароль обов'язковий, якщо ви ввели старий пароль",
// 				path: ['newPassword'],
// 			}),
// 	})
// 	.refine(data => !data.password || data.password === data.newPassword, {
// 		message: 'Паролі не співпадають',
// 		path: ['newPassword'],
// 	})

const EditProfile: FC = () => {
	const queryClient = useQueryClient()
	const { logout } = useActions()
	const { replace } = useRouter()
	const form = useForm<IEditProfileForm>({
		//resolver: zodResolver(formSchema),
	})
	const { mutate } = useMutation({
		mutationKey: ['updateProfileData'],
		mutationFn: (data: IEditProfileForm) => UserService.updateProfile(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getProfile'] })
			form.reset()
			toast.success('Профіль відредаговано успішно!')
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: ['getProfile'] })
			form.reset()
			toast.error('Помилка редагування профілю!')
		},
	})

	const logoutClick = () => {
		logout()
		replace('/')
	}

	const onSubmit = (data: IEditProfileForm) => {
		if (data.password !== data.newPassword) {
			form.setError('newPassword', {
				message: 'Паролі не співпадають',
			})
		} else {
			mutate(data)
		}
	}
	return (
		<Form {...form}>
			<form
				className='md:grid grid-cols-2 gap-2 col-span-2'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Редагувати ім'я та прізвище</FormLabel>
							<FormControl>
								<Input placeholder="Ім'я та прізвище" {...field} />
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
							<FormLabel>Редагувати пароль</FormLabel>
							<FormControl>
								<Input placeholder='Старий пароль' {...field} />
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
							<FormLabel>Редагувати номер телефону</FormLabel>
							<FormControl>
								<Input placeholder='Номер телефону' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='newPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Новий пароль</FormLabel>

							<FormControl>
								<Input placeholder='Новий пароль' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-full' type='submit'>
					Редагувати
				</Button>
				<Button
					className='w-full'
					variant={'outline'}
					type='submit'
					onClick={logoutClick}
				>
					Вийти
				</Button>
				<Toaster richColors />
			</form>
		</Form>
	)
}

export default EditProfile
