/**
 * @description Promise.reject()方法返回一个带有拒绝原因的Promise对象。
 * */
import MyPromise from '../promise.js';

MyPromise.reject(new Error('fail')).then(
	() => {
		// not called
	},
	(error) => {
		console.error(error); // Error: fail
	}
);
