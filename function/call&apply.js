// 实现call apply

/* 
将函数设为对象的属性
执行&删除这个函数
指定this到函数并传入给定参数执行函数
如果不传入参数，默认指向为 window 
*/

Function.prototype.myCall = function (context = window, ...args) {
	// 在context上加一个唯一值不影响context上的属性
	let key = Symbol('key');
	context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法

	let result = args ? context[key](...args) : context[key]();

	delete context[key]; // 不删除会导致context属性越来越多

	return result;
};

// 测试 用法：f.call(obj,arg1)
function f(a, b) {
	console.log(a + b);
	console.log(this.name);
}
let obj = {
	name: 1,
};
f.myCall(obj, 1, 2);

Function.prototype.myApply = function (context = window, arr) {
	// 在context上加一个唯一值不影响context上的属性
	let key = Symbol('key');

	context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法

	let result = arr ? context[key](...arr) : context[key](arr);
	delete context[key]; // 不删除会导致context属性越来越多

	return result;
};

// 测试 用法：f.apply(obj, [1])
function f1(a, b) {
	console.log(a, b);
	console.log(this.name);
}

let obj1 = {
	name: '张三',
};

f1.myApply(obj1, [1, 2]);
