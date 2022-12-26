function fn(a, b) {
	console.log(fn.length); // 形参个数
	console.log(arguments.length); // 实参个数
}

fn();

const fnc = (...args) => {
	console.log(args.length); // 实参个数
};

fnc('@');

class Super {
	// constructor(a, b) {
	constructor(...args) {
		console.log(Super.length); // 形参个数
		console.log(args); // 实参个数
		// console.log(arguments.length); // 实参个数
	}
}

new Super(1);
