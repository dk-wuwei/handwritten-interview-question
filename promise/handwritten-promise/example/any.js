/**
 * @description Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。
 *
 * Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。
 * 如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。
 *
 * 如果传入的参数是一个空的可迭代对象，则返回一个已失败（already rejected） 状态的 Promise。
 * 如果传入的参数不包含任何 promise，则返回一个 异步完成 （asynchronously resolved）的 Promise。(将非Promise值，转换为Promise并当做成功)
 * 只要传入的迭代对象中的任何一个 promise 变成成功（resolve）状态，或者其中的所有的promises 都失败，那么返回的 promise 就会 异步地（当调用栈为空时）变成成功/失败（resolved/reject）状态。(如果所有Promise都失败，则报错)
 */
import MyPromise from '../promise.js';

MyPromise.any([]).catch((e) => {
	console.log(e);
});

const pErr = new Promise((resolve, reject) => {
	reject('总是失败');
});

const pSlow = new Promise((resolve, reject) => {
	setTimeout(resolve, 500, '最终完成');
});

const pFast = new Promise((resolve, reject) => {
	setTimeout(resolve, 100, '很快完成');
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
	console.log(value); // "很快完成"
});

const pErr1 = new MyPromise((resolve, reject) => {
	reject('总是失败');
});

const pErr2 = new MyPromise((resolve, reject) => {
	reject('总是失败');
});

const pErr3 = new MyPromise((resolve, reject) => {
	reject('总是失败');
});

MyPromise.any([pErr1, pErr2, pErr3]).catch((e) => {
	console.log(e);
});
