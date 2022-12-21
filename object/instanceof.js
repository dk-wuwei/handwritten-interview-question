// 模拟 instanceof 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
const myInstanceof = (L, R) => {
	const O = R.prototype; // 获取右侧构造器 构造函数的原型独享

	try {
		// 避免 null.__proto__
		L = L.__proto__; // L赋值为其隐式原型对象

		while (true) {
			// 遍历循环
			if (L === null) return false; // 若为null 就是找到了顶层了 还没匹配到 就返回 false
			if (L === O) return true; // 相等就返回true
			L = L.__proto__;
		}
	} catch (error) {
		return false;
	}
};

function checkPrototype(obj, constructor) {
	try {
		const proto = Reflect.getPrototypeOf(obj);
		const { prototype } = constructor;

		if (!proto) return false;

		if (proto === prototype) return true;

		return checkPrototype(proto, constructor);
	} catch (error) {
		console.error(error);
		return false;
	}
}

class User {}

class Admin extends User {}

const dk = new Admin();

// instanceof测试
console.log('instanceof User =>', dk instanceof User);
console.log('instanceof Admin =>', dk instanceof Admin);

// myInstanceof测试
console.log('myInstanceof User =>', myInstanceof(dk, User));
console.log('myInstanceof Admin =>', myInstanceof(dk, Admin));

// checkPrototype测试
console.log('checkPrototype User =>', checkPrototype(dk, User));
console.log('checkPrototype Admin =>', checkPrototype(dk, Admin));
