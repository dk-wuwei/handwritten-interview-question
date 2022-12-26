/**
 * n的阶乘
 */

// while循环：
function factorial1(num) {
	let res = 1;
	while (num) {
		res *= num;
		num--;
	}

	return res;
}

console.log('while循环：', factorial1(5));

// 利用函数递归：
function factorial2(num) {
	if (num <= 0) {
		return 1;
	} else {
		// return num * arguments.callee(num - 1);
		return num * factorial2(num - 1);
	}
}

console.log('利用函数递归：', factorial2(5));
