Array.prototype.myPush = function (ele) {
	this[this.length] = ele;
	return this.length;
};

const arr = [1, 2];

console.log(arr.myPush(3));
console.log(arr);
console.log(arr.length);

console.log(arr.myPush(4));
console.log(arr);
console.log(arr.length);
