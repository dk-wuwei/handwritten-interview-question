/**
 * @description Promise.resolve(value)  将给定的一个值转为Promise对象。
 *
 * 如果这个值是一个 promise ，那么将返回这个 promise ；
 * 如果这个值是thenable（即带有"then" 方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
 * 否则返回的promise将以此值完成，即以此值执行resolve()方法 (状态为fulfilled)。
 */
import MyPromise from '../promise.js';

const p1 = MyPromise.resolve(123);

p1.then((value) => {
	console.log(value); // 123
});

// Resolve一个thenable对象
const p2 = MyPromise.resolve({
	then: (onFulfill) => {
		onFulfill('Resolving');
	},
});
// 宏任务先执行
console.log(p2 instanceof MyPromise, '这是一个Promise对象'); // true, 这是一个Promise对象

setTimeout(() => {
	console.log('p2 :>> ', p2);
}, 1000);

p2.then(
	(v) => {
		console.log(v); // Resolving
	},
	(e) => {
		// 不会被调用
	}
);

// Thenable在callback之前抛出异常
// MyPromise rejects
const thenable = {
	then: (resolve) => {
		throw new TypeError('Throwing');
		resolve('Resolving');
	},
};

const p3 = MyPromise.resolve(thenable);
p3.then(
	(v) => {
		// 不会被调用
	},
	(e) => {
		console.log(e); // TypeError: Throwing
	}
);
