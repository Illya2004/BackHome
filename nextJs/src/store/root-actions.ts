import { filtersSlice } from './filter/filter.slice.js'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...filtersSlice.actions,
}
