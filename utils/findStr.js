function findStr(str) {
	const temp = {};
	for (let i = 0; i < str.length; i++) {
		if (temp.hasOwnProperty(str[i])) {
			temp[str[i]]++;
		} else {
			temp[str[i]] = 1;
		}
	}

	for (const key in temp) {
		if (temp[key] === 1) {
			return key;
		}
	}
}

let str = 'aaabbccd';

console.log(findStr(str));

function findStr2(str) {
	const temp = {};
	for (let i = 0; i < str.length; i++) {
		if (temp.hasOwnProperty(str[i])) {
			temp[str[i]]++;
		} else {
			temp[str[i]] = 1;
		}
	}

	return Object.values(temp);
}

console.log(Math.max(...findStr2(str)));
