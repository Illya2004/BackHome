import { IUser } from '@/interfaces/user.interfaces'
import { type FC } from 'react'
import ProfileDataItem from './profile-data-item'
interface IProfileDataProps {
	user?: IUser
}
const ProfileData: FC<IProfileDataProps> = ({ user }) => {
	return (
		<div>
			<ProfileDataItem data={user?.name} title={"Моє ім'я та прізвище"} />
			<ProfileDataItem data={user?.email} title={'Мій email'} />
			<ProfileDataItem data={user?.phoneNumber} title={'Мій телефон'} />
		</div>
	)
}

export default ProfileData
