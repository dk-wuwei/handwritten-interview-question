// 计算数组中最大差值

let arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];

const difference = (arr) => {
	let min = arr[0],
		max = 0;
	arr.forEach((value) => {
		if (value < min) min = value;
		if (value > max) max = value;
	});

	return max - min;
};
console.log('forEach 测试：' + difference(arr)); // forEach 测试：74

const difference1 = (arr) => {
	let min = Math.min(...arr),
		max = Math.max(...arr);

	return max - min;
};
console.log('Math 测试：' + difference(arr)); // Math 测试：74
