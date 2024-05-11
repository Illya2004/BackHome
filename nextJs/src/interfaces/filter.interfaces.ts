export interface IFilterData {
	limit?: number
	page?: number
	date?: EnumFilterDate
}
export interface IFiltersActionPayload {
	key: keyof IFilterData
	value: string
}

export interface IFiltersState {
	isFilterUpdated: boolean
	queryParams: IFilterData
}
export interface ISelectOptions {
	value: string
	label: string
}
export enum EnumFilterDate {
	asc = 'ASC',
	desc = 'DESC',
}
