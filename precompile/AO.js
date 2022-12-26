/**
 * JS 预编译 AO 过程
 * 1. 寻找形参和变量声明
 * 2. 实参值赋值给形参
 * 3. 找到函数声明
 * 4. 执行
 */

function test(a) {
	console.log(a);
	var a = 1;
	console.log(a);
	function a() {}
	console.log(a);
	var b = function () {};
	console.log(b);
	function d() {}
}

test(2);

/**
 * AO = {
 *  a: undefined -> 2 -> function a(){} -> 1,
 *  b: undefined -> function (){},
 *  d: function d() {}
 * }
 */
