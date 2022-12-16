/**
 * @description 实例（原型）方法：catch 捕获异常
 *
 * catch() 方法返回一个Promise，并且处理拒绝的情况，用于指定发生错误时的回调函数。
 * 它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。
 */
import MyPromise from '../promise.js';

const p1 = new MyPromise((resolve, reject) => {
	throw new Error('test');
});

p1.catch((error) => {
	console.log(error); //Error: test
});
