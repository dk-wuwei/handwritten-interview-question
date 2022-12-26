// js 预解析 过程
// 1. 创建 2. var 提升 3. 形参和实参赋值
// 4. function 提升 5. 执行函数

function Foo() {
	getName = function () {
		console.log(1);
	};
	return this;
}

Foo.getName = function () {
	console.log(2);
};

Foo.prototype.getName = function () {
	console.log(3);
};

var getName = function () {
	console.log(4);
};

function getName() {
	console.log(5);
}

// 注释下面一行是一道题 不注释是另一道
console.log(Foo()); // window

Foo.getName(); // 2 2

getName(); // 1 4

Foo().getName(); // 1 1

getName(); // 1 1

// 注意 js 运算符优先级
// () 最高 然后是 .
// 下面一行是 先Foo.getName() 在new Foo.getName()的返回值
new Foo.getName(); // 2 2

// 下面一行是 先new Foo() 在拿到返回的实例对象.getName()
new Foo().getName(); // 3 3

/*
 * 下面一行是 先new Foo() 在拿到返回的实例对象.getName()
 * 在拿到new Foo()返回的实例对象.getName() 的返回值 进行 newd调用
 */
new new Foo().getName(); // 3 3
