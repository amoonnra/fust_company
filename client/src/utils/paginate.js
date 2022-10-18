export default function paginate(arr, currentItem, pageSize) {
	const startIndex = (currentItem - 1) * pageSize;
	const endIndex = currentItem * pageSize;
	return [...arr].slice(startIndex, endIndex);
}
