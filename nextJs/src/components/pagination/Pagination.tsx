import { cn } from '@/lib/utils'
import { type FC } from 'react'
import Arrow from './Arrow'
interface IPaginationProps {
	numberPages: number
	updatePage: (page: string) => void
	currentPage: number | string
}
const Pagination: FC<IPaginationProps> = ({
	numberPages,
	updatePage,
	currentPage,
}) => {
	const onArrowClick = (direction: string) => {
		const newPage =
			direction === 'left'
				? (+currentPage - 1).toString()
				: (+currentPage + 1).toString()
		updatePage(newPage)
	}
	return (
		<div className='flex gap-4 mt-10 justify-center items-center'>
			<Arrow
				direction={'left'}
				clickFunction={onArrowClick}
				disabled={currentPage == 1}
			/>
			{Array.from({
				length: numberPages > 1 ? numberPages : 0,
			}).map((_, index) => {
				const pageNumber = (index + 1).toString()
				return (
					<button
						className={cn('w-2 h-2 bg-tertiary rounded-full', {
							'bg-accent': currentPage === pageNumber,
						})}
						key={index}
						onClick={() => updatePage(pageNumber)}
						disabled={currentPage === pageNumber}
					></button>
				)
			})}
			<Arrow
				direction={'right'}
				clickFunction={onArrowClick}
				disabled={currentPage == numberPages}
			/>
		</div>
	)
}

export default Pagination
