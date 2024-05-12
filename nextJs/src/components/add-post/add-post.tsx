'use client'
import { LazyMap } from '@/app/(user)/page'
import { cn } from '@/lib/utils'
import { PostService } from '@/services/post.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ChangeEvent, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { date, z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
	image: z.any(),
	title: z.string().min(30, { message: "Обов'язково мінімум 30 символів" }),
	description: z
		.string()
		.min(50, { message: "Обов'язково мінімум 50 символів" }),
	lostDate: z.date({ message: "Обо'язкове поле" }),
	locationCoords: z.string({ message: "Обо'язкове поле" }),
})
const AddPost: FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const { mutate: mutatePost } = useMutation({
		mutationKey: ['addPost'],
		mutationFn: (data: any) => PostService.createPost(data),
		onSuccess: () => {
			form.reset()
			toast.success('Запит успішно створено')
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { image, ...rest } = values
		let formData = new FormData()
		formData.append('image', image)
		formData.append('post', JSON.stringify(rest))
		mutatePost(formData)
	}
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Створити запит</DialogTitle>
				<DialogDescription>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
							<FormField
								control={form.control}
								name='image'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type='file'
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													field.onChange(e.target.files?.[0])
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Заголовок</FormLabel> */}
										<FormControl>
											<Input placeholder='Заголовок' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Заголовок</FormLabel> */}
										<FormControl>
											<Textarea placeholder='Опис' {...field} rows={2} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lostDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant={'outline'}
														className={cn(
															'w-[240px] justify-start text-left font-normal',
															!date && 'text-muted-foreground'
														)}
													>
														<CalendarIcon className='mr-2 h-4 w-4' />
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0' align='start'>
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={field.onChange}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='locationCoords'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<LazyMap
												onClick={field.onChange}
												style={{ width: 450, height: 300 }}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Submit
							</Button>
						</form>
					</Form>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	)
}

export default AddPost
