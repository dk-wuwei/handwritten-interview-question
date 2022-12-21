/* 
对象的继承
1. 原型链继承；引用值共享的问题
2. 构造函数继承；没办法拿到原型上的方法
3. 组合继承（伪经典继承）会重复new 构造函数
4. 寄生组合继承（经典集成）

*/
function Extend(sub, sup) {
	// 原型链继承；获取对象原型上的方法
	sub.prototype = Object.create(sup.prototype);

	// 设置函数原型的构造函数
	sub.prototype.constructor = sub;
}

function User(name) {
	this.name = name;
}

function Access(...rest) {
	// 构造函数继承；获取对象的属性
	// 解决 引用值共享数据问题
	// this 默认指向 window 或 undefined 需要改变this为当前函数
	User.apply(this, rest);
}

Extend(User, Access); // User 继承 Access
