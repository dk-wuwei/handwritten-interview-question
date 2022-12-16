/**
 * @description Promise.allSettled(iterable)方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
 *
 * 当有多个彼此不依赖的异步任务成功完成时，或者总是想知道每个promise的结果时，通常使用它。
 * 相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。
 *
 * 参数 iterable 是一个可迭代的对象，例如Array，其中每个成员都是Promise。
 * 对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。
 */

import MyPromise from '../promise.js';

const p1 = MyPromise.resolve(3);
const p2 = 1;
const p3 = [p1, p2];

MyPromise.allSettled(p3).then((results) => {
	console.log(results); // [{ status: 'fulfilled', value: 3 },{ status: 'fulfilled', value: 1 }]
});

setTimeout(() => {
	const p1 = MyPromise.resolve(3);
	const p2 = new MyPromise((resolve, reject) => setTimeout(reject, 100, 'foo'));
	const ps = [p1, p2];

	MyPromise.allSettled(ps).then(
		(results) => {
			console.log(results); // [{ status: 'fulfilled', value: 3 },{ status: 'rejected', reason: 'foo' }]
		}
		// results.forEach((result) => console.log(result))
	);
}, 1000);

MyPromise.allSettled([]).then((results) => console.log(results)); // []
