/**
 * @description Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
 *
 * 一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的返回值，从而异步地解析或拒绝（一旦堆栈为空）。
 * race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
 *
 * 如果传的迭代是空的，则返回的 promise 将永远等待。
 * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。
 */
import MyPromise from '../promise.js';

// 数组全是非Promise值，测试通过
let p1 = MyPromise.race([1, 3, 4]);
setTimeout(() => {
	console.log('p1 :>> ', p1); // 1
});

// 空数组，测试通过
let p2 = MyPromise.race([]);
setTimeout(() => {
	console.log('p2 :>> ', p2); // pending
});
