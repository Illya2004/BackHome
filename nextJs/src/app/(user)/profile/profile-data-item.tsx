import { Label } from '@/components/ui/label'
import { type FC } from 'react'
interface IProfileDataItemProps {
	data?: string
	title: string
}
const ProfileDataItem: FC<IProfileDataItemProps> = ({ data, title }) => {
	return (
		<div>
			<Label className='text-secondary'>{title}</Label>
			<p className={'text-xl'}>{data}</p>
		</div>
	)
}

export default ProfileDataItem
