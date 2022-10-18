const timeAgo = (timeMs) => {
	const date = new Date(Date.parse(timeMs));
	const diffTime = (Date.now() - Date.parse(timeMs)) / 1000;
	const min = 60;
	const fiveMin = 5 * min;
	const tenMin = 10 * min;
	const halfHour = 30 * min;
	const day = 24 * 60 * min;
	const year = 365 * day;

	const toDoubleNum = (num) => {
		return num > 9 ? num : '0' + num;
	};

	const dateMinute = toDoubleNum(date.getMinutes());
	const dateHour = toDoubleNum(date.getHours());
	const dateDay = toDoubleNum(date.getDate());
	const dateMonth = toDoubleNum(date.getMonth() + 1);
	const dateYear = date.getFullYear();
	console.log(date);
	if (diffTime <= min) {
		return '1 минуту назад';
	}
	if (diffTime > min && diffTime <= fiveMin) {
		return '5 минут назад';
	}
	if (diffTime > fiveMin && diffTime <= tenMin) {
		return '10 минут назад';
	}
	if (diffTime > tenMin && diffTime <= halfHour) {
		return '30 минут назад';
	}
	if (diffTime > halfHour && diffTime <= day) {
		return dateHour + ':' + dateMinute;
	}
	if (diffTime > day && diffTime <= year) {
		return dateDay + '.' + dateMonth;
	}
	if (diffTime > year) {
		return dateDay + '.' + dateMonth + '.' + dateYear;
	}
	return 'Error';
};

export default timeAgo;
