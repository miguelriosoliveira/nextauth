export function isEmptyObject(value: object) {
	return value && Object.keys(value).length === 0 && value.constructor === Object;
}
