// 静态方法：all
/**
 * @description Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 输入的所有promise的resolve回调的结果是一个数组。
 *
 * Promise.all 等待所有都完成（或第一个失败）
 * 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
 * 如果参数中包含非 promise 值，这些值将被忽略，但仍然会被放在返回数组中，如果 promise 完成的话 (也就是如果参数里的某值不是Promise，则需要原样返回在数组里)
 * 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。
 * 如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成
 */
import MyPromise from '../promise.js';

const p1 = MyPromise.resolve(3);
const p2 = 42;
const p3 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(100);
	});
});

MyPromise.all([p1, p2, p3]).then((values) => {
	console.log(values); // [3, 42, 100]
});
