/**
 * JS 预编译 GO 过程
 * GO global object 全局上下文
 * 1. 找变量
 * 2. 找函数声明
 * 3. 执行
 *
 * 预编译 不关心 if 语句
 */

var n = 1;

function n() {
	console.log(2);
}

console.log(n);

/**
 * GO = {
 *  a: undefined -> function a(){} -> 1,
 * }
 */

function fn() {
	// 下面会将  m z 声明为全局变量
	let o = (m = z = 1);
	console.log(o);
}
fn();
console.log('globalThis', globalThis.m, globalThis.z);

function test() {
	console.log(b);
	if (a) {
		var b = 2;
	}
	console.log(b);
	c = 3;
	console.log(c);
}

var a;
test();
a = 1;
console.log(a);
