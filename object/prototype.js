function User(name) {
	this.name = name;
}
User.show = function () {
	console.log('User.show');
};

function Admin(name) {
	User.call(this, name);
}

//
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Reflect.setPrototypeOf(Admin, User);

console.dir(User);
console.dir(Admin);
Admin.show();

const dk = new Admin('dk');

console.log(dk);

let a = {
	name: 'a',
	show() {
		console.log(this.name);
	},
};

let b = {
	// name: 'b',
	__proto__: a,
	show() {
		console.log(this.name);
	},
};

// Reflect.setPrototypeOf(b, a);

console.dir(b);

b.show();
