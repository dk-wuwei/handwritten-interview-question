/**
 * 伪代码 实现
 */
let a = 1;
let b = 1;

function beforeAdd() {
	a += 1;
	return a;
}

function afterAdd() {
	let res = b;
	b += 1;
	return res;
}

console.log(beforeAdd());
console.log(a);
console.log(afterAdd());
console.log(b);
