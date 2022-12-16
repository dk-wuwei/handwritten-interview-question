// 去重

let arr = ['1', '2', '3', '1', 'a', 'b', 'b'];
const unique = (arr) => {
	let obj = {};
	arr.forEach((value) => {
		obj[value] = 0;
	});
	return Object.keys(obj);
};
console.log('测试 forEach：' + unique(arr)); // ['1','2','3','a','b']

const unique1 = (arr) => {
	return arr.filter((ele, index, array) => {
		return index === array.indexOf(ele);
	});
};
console.log('测试 filter：' + unique1(arr)); // ['1','2','3','a','b']

const unique2 = arr.reduce((res, item) => {
	res[item] = 0;
	return res;
}, {});
console.log('测试 reduce：' + Object.keys(unique2)); // ['1','2','3','a','b']

const unique3 = (arr) => {
	return [...new Set(arr)];
};
console.log('测试 Set：' + unique3(arr)); // ['1','2','3','a','b']
