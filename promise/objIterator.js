/**
 * 简单实现 对象的 迭代
 */
const obj = {
	a: 1,
	b: 2,
	c: 3,
	// [Symbol.iterator]() {
	// 	let index = 0;
	// 	const res = Object.entries(this);

	// 	return {
	// 		next() {
	// 			if (index < res.length) {
	// 				return { value: Object.fromEntries([res[index++]]), done: false };
	// 			}
	// 			return { value: undefined, done: true };
	// 		},
	// 	};
	// },
	[Symbol.iterator]: function* () {
		let index = 0;
		const res = Object.entries(this);

		while (index < res.length) {
			// yield 会 返回一个对象 { value: xx, done: boolean }
			yield Object.fromEntries([res[index++]]);
		}
	},
};

Reflect.defineProperty(obj, Symbol.iterator, {
	enumerable: false,
});

// obj[Symbol.iterator]();

for (const val of obj) {
	console.log(val);
}

const temp = {
	a: 1,
	b: 2,
	c: 3,
};

for (const val of Object.entries(temp)) {
	console.log(Object.fromEntries([val]));
}
