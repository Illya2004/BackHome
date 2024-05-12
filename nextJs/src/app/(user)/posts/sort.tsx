'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useFilters } from '@/hooks/useFilters'
import { type FC } from 'react'

const data = [
	{
		value: 'ASC',
		label: 'По зростанню',
	},
	{ value: 'DESC', label: 'По спаданню' },
]

const Sort: FC = () => {
	const { updateQueryParams } = useFilters()
	return (
		<div>
			<Select onValueChange={value => updateQueryParams('date', value)}>
				<SelectTrigger className='w-[280px]'>
					<SelectValue placeholder='Виберіть сортування' />
				</SelectTrigger>
				<SelectContent>
					{data.map(d => (
						<SelectItem value={d.value}>{d.label}</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export default Sort
