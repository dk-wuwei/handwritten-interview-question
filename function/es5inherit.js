// es5继承  寄生式组合继承
function Parent(name) {
	this.parent = name;
}
Parent.prototype.say = function () {
	console.log(`${this.parent}: 你打篮球的样子像kunKun`);
};

function Child(name, age) {
	// 将父类的构造函数绑定在子类上
	Parent.call(this, name);
	this.age = age;
}

// 创建父类原型的副本 让子类与父类原型隔离
Child.prototype = Object.create(Parent.prototype);
Child.prototype.say = function () {
	console.log(`${this.parent}好，我是练习时长两年半的${this.child}`);
};

// 让子类构造函数指向自身
Child.prototype.constructor = Child;

// 测试
const parent = new Parent('father');
parent.say(); // father: 你打篮球的样子像kunKun

const child = new Child('cxk', 'father');
child.say(); // father好，我是练习时长两年半的cxk
