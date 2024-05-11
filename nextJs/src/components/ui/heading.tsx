import { cn } from '@/lib/utils'
import { PropsWithChildren, type FC } from 'react'
interface IHeadingProps {
	className?: string
}
const heading: FC<PropsWithChildren<IHeadingProps>> = ({
	children,
	className,
}) => {
	return <h1 className={cn('text-2xl font-bold', className)}>{children}</h1>
}

export default heading
