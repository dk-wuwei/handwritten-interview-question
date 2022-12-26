// 模拟Object.create()方法创建一个新对象
const myCreate = (proto) => {
	function F() {}
	F.prototype = proto;
	return new F();
};

const obj = {
	a: 12,
};
// 测试
console.log(myCreate(obj).a);
const num = Number(1);

console.log(num); // [Number: 1]
console.log(typeof num); // object
