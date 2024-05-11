import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { EnumRole } from '@/enums/role.enum'
import { type FC } from 'react'
import { type Control } from 'react-hook-form'
import creator from '../../../assets/images/creator.svg'
import volunteer from '../../../assets/images/volunteer.svg'
interface IRoleProps {
	control: Control<
		{
			name: string
			role: string
			email: string
			password: string
			confirmPassword: string
		},
		any
	>
}
const Role: FC<IRoleProps> = ({ control }) => {
	return (
		<FormField
			control={control}
			name='name'
			render={({ field: { onChange, ...rest } }) => (
				<FormItem>
					{/* <FormLabel>Ім'я та прізвище</FormLabel> */}
					<FormControl>
						<>
							<button onClick={() => onChange(EnumRole.VOLUNTEER)} {...rest}>
								<img src={volunteer} />
							</button>
							<button onClick={() => onChange(EnumRole.CREATOR)} {...rest}>
								<img src={creator} />
							</button>
						</>
					</FormControl>
					<FormDescription></FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Role
