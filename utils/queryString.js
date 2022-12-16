function f(str) {
	let num = 0;
	let char = '';
	// 使其按照一定的次序排列
	str = str.split('').sort().join('');
	// "aaaadefghiiijklopqrstuwy"

	// 定义正则表达式
	let re = /(\w)\1+/g;
	str.replace(re, ($0, $1) => {
		if (num < $0.length) {
			num = $0.length;
			char = $1;
		}
	});

	return {
		num,
		char,
	};
}

// 测试
console.log(f('asdfghjklaqwertyuiopiaia')); // { num: 4, char: 'a' }
