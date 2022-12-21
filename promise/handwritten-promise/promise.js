/**
 * 实例（原型）方法：then、catch、finally
 * 静态方法：resolve、reject、all、race、allSettled、any
 */
class MyPromise {
	static PENDING = 'pending';
	static FULFILLED = 'fulfilled';
	static REJECTED = 'rejected';

	/***
	 * @callback executor
	 * @param resolve {function}
	 * @param reject {function}
	 */
	/**
	 * @param executor {executor} promise回调函数
	 */
	constructor(executor) {
		this.promiseState = MyPromise.PENDING; // 定义状态
		this.promiseResult = null; // 当前promise结果
		this.fulfilledCallBacks = []; // 成功回调函数数组
		this.rejectedCallBacks = []; // 失败回调函数数组
		try {
			// 执行回调函数 传入res, rej回调函数
			// this 默认指向是调用函数的上下文 所以这里需要bind(this) 把当前类的this传递过去
			executor(this.resolve.bind(this), this.reject.bind(this));
		} catch (error) {
			// 直接调用reject函数 返回错误原因
			this.reject(error);
		}
	}

	/**
	 * @description promise执行成功的函数，设置当前状态为fulfilled、赋值结果，有注册的成功回调就遍历执行把结果值传入该回调
	 * @param result {any} 成功的结果
	 */
	resolve(result) {
		if (this.promiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.promiseState = MyPromise.FULFILLED; // 设置当前的promise状态
				this.promiseResult = result; // 赋值结果
				for (const fulfilledCallBack of this.fulfilledCallBacks) {
					fulfilledCallBack(result); // 执行回调函数
				}
			});
		}
	}

	/**
	 * @description promise执行失败的函数，设置当前状态为rejected、赋值结果，有注册的失败回调就遍历执行把失败原因传入该回调
	 * @param reason {any} 失败原因
	 */
	reject(reason) {
		if (this.promiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.promiseState = MyPromise.REJECTED; // 设置当前的promise状态
				this.promiseResult = reason; // 赋值结果
				for (const rejectedCallBack of this.rejectedCallBacks) {
					rejectedCallBack(reason); // 执行回调函数
				}
			});
		}
	}

	/**
	 * @description promise实例状态改变的回调函数，有两个参数：第一个是成功回调函数，第二个是失败回调函数。他会返回一个全新的promise，因此可以继续then链式调用。
	 * @param onFulfilled {function} 成功回调
	 * @param onRejected {function?} 失败回调
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	then(onFulfilled, onRejected) {
		// 兜底 是函数就使用原函数 否则设置一个函数 成功的就直接返回数据 失败的就throw err
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err;
				  };

		// TODO 不能返回当前Promise
		// 返回新的promise对象，使其可以继续链式调用如：then catch
		return new MyPromise((resolve, reject) => {
			if (this.promiseState === MyPromise.PENDING) {
				// 当前promise是进行中的状态，需要把成功、失败回调储存起来并在之后遍历执行
				this.fulfilledCallBacks.push(() => {
					// 添加失败回调函数进入数组 在执行resolve时循环执行
					setTimeout(() => {
						let x = onFulfilled(this.promiseResult); // 执行回调函数传入当前结果
						x instanceof MyPromise ? x.then(resolve, reject) : resolve(x); // 如果返回的是promise 就执行其then方法
					});
				});
				this.rejectedCallBacks.push(() => {
					// 添加失败回调函数进入数组 在执行reject时循环执行
					setTimeout(() => {
						let x = onRejected(this.promiseResult); // 执行回调函数传入当前结果
						x instanceof MyPromise ? x.then(resolve, reject) : reject(x); // 如果返回的是promise 就执行其then方法
					});
				});
			} else if (this.promiseState === MyPromise.FULFILLED) {
				// 当前promise是成功的状态
				try {
					// 直接执行成功回调
					setTimeout(() => {
						let x = onFulfilled(this.promiseResult); // 执行回调函数传入当前结果
						x instanceof MyPromise ? x.then(resolve, reject) : resolve(x); // 如果返回的是promise 就执行其then方法
					});
				} catch (error) {
					// 错误时 调用失败回调
					reject(error);
				}
			} else {
				// 当前promise是失败的状态
				try {
					// 直接执行失败回调
					setTimeout(() => {
						let x = onRejected(this.promiseResult);
						x instanceof MyPromise ? x.then(resolve, reject) : reject(x);
					});
				} catch (error) {
					// 错误时 调用失败回调
					reject(error);
				}
			}
		});
	}

	/**
	 * @description 失败回调函数，状态变为rejected执行。相当于promise.then(null/undefined, onRejected)
	 * @param onRejected {function} 失败回调函数
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	catch(onRejected) {
		// 返回新的promise对象，使其可以继续链式调用如：then catch 只用传入reject回调函数
		return this.then(undefined, onRejected);
	}

	/**
	 * @description finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
	 * @param callBack {function} 回调函数
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	finally(callBack) {
		// 返回新的promise对象，使其可以继续链式调用如：then catch
		return this.then(callBack, callBack);
	}

	/**
	 * @description Promise.resolve(value)
	 * @param value {any} 要解析为 MyPromise 对象的值
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static resolve(value) {
		//如果是Promise
		if (value instanceof MyPromise) {
			return value;
		} else if (value && typeof value === 'object' && 'then' in value) {
			// 如果是object 并且有then属性 也就是thenable形式
			// 返回新的promise对象，使其可以继续链式调用如：then catch 并调用其then方法
			return new MyPromise((resolve, reject) => {
				value.then(resolve, reject);
			});
		}
		// 基本类型值直接返回 返回新的promise对象，使其可以继续链式调用如：then catch 并执行resolve函数
		return new MyPromise((resolve) => {
			resolve(value);
		});
	}

	/**
	 * @description Promise.reject()方法返回一个带有拒绝原因的Promise对象。
	 * @param error {any}  错误原因
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static reject(error) {
		// 返回新的promise对象，使其可以继续链式调用如：then catch 并执行reject函数
		return new MyPromise((resolve, reject) => {
			reject(error);
		});
	}

	/**
	 * @description Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 输入的所有promise的resolve回调的结果是一个数组。只要有一个失败就直接rejected 结束（错误承包制，第一个失败的）。
	 * @param promiseList {any[]} promise或其他类型数据组成的数组
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static all(promiseList) {
		// 校验参数类型
		if (Array.isArray(promiseList)) {
			// 返回新的promise对象，使其可以继续链式调用如：then catch
			return new MyPromise((resolve, reject) => {
				if (promiseList.length === 0) {
					// 空数组直接resolve返回
					resolve(promiseList);
				}

				let current = 0; // 下标记录执行到那里，用于判断是否循环完了
				const result = []; // 都是成功的promise时返回最终的结果数组

				// 遍历list
				promiseList.forEach((item, index) => {
					if (item instanceof MyPromise) {
						// 是promise对象
						// 调用resolve方法拿到结果
						MyPromise.resolve(item).then(
							(res) => {
								current++; // 更新下标
								result[index] = res; // 把结果添加到result数组中
								current === promiseList.length && resolve(result); // 判断是否执行完 && 返回结果数组
							},
							(error) => {
								reject(error); // 只要有一个失败就直接reject reject中会throw err 结束循环
							}
						);
					} else {
						// 非promise对象
						current++; // 更新下标
						result[index] = item; // 把结果添加到result数组中
						current === promiseList.length && resolve(result); // 判断是否执行完 && 返回结果数组
					}
				});
			});
		} else {
			// 参数类型错误 直接结束
			throw TypeError('argument must be Array');
		}
	}

	/**
	 * @description Promise.allSettled(iterable)方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
	 * @param promiseList {any[]} promise或其他类型数据组成的数组
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static allSettled(promiseList) {
		// 校验参数类型
		if (Array.isArray(promiseList)) {
			// 返回新的promise对象，使其可以继续链式调用如：then catch
			return new MyPromise((resolve) => {
				if (promiseList.length === 0) {
					// 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
					return resolve(promiseList);
				}

				let current = 0; // 下标记录执行到那里，用于判断是否循环完了
				const result = []; // 最终执行完所有的promiseList返回的结果数组

				// 遍历list
				promiseList.forEach((item, index) => {
					// 调用resolve方法拿到结果
					MyPromise.resolve(item).then(
						(res) => {
							current++; // 更新下标
							result[index] = {
								status: MyPromise.FULFILLED, // 标识当前数据的promise完成状态为成功
								value: res, // 成功的promise 设置value
							};
							current === promiseList.length && resolve(result); // 判断是否执行完 && 返回结果数组
						},
						(error) => {
							current++; // 更新下标
							result[index] = {
								status: MyPromise.REJECTED, // 标识当前数据的promise完成状态为失败
								reason: error, // 失败的promise 设置reason
							};
							current === promiseList.length && resolve(result); // 判断是否执行完 && 返回结果数组
						}
					);
				});
			});
		} else {
			// 参数类型错误 直接结束
			throw TypeError('argument must be Array');
		}
	}

	/**
	 * @description Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。
	 * @param promiseList {any[]} promise或其他类型数据组成的数组
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static any(promiseList) {
		// 校验参数类型
		if (Array.isArray(promiseList)) {
			// 返回新的promise对象，使其可以继续链式调用如：then catch
			return new MyPromise((resolve, reject) => {
				// 注意：如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
				if (promiseList.length === 0)
					return reject(new AggregateError('All promises were rejected'));

				let current = 0; // 下标记录执行到那里，用于判断是否循环完了
				const errors = []; // 存放失败的结果

				// 遍历list
				promiseList.forEach((item) => {
					// 调用resolve方法拿到结果
					MyPromise.resolve(item).then(
						(res) => {
							resolve(res); // 只要有一个就返回
						},
						(reason) => {
							current++; // 更新下标
							errors.push(reason); // 把错误的原因push进失败结果的数组
							/**
							 * 如果可迭代对象中没有一个 promise 成功，就返回一个失败的 promise 和AggregateError类型的实例，
							 * AggregateError是 Error 的一个子类，用于把单一的错误集合在一起。
							 */
							current === promiseList.length &&
								reject(new AggregateError(errors));
						}
					);
				});
			});
		} else {
			// 参数类型错误 直接结束
			throw TypeError('argument must be Array');
		}
	}

	/**
	 * @description Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
	 * @param promiseList {any[]} promise或其他类型数据组成的数组
	 * @returns {MyPromise} 返回新的promise对象，使其可以继续链式调用如：then catch
	 */
	static race(promiseList) {
		// 校验参数类型
		if (Array.isArray(promiseList)) {
			// 返回新的promise对象，使其可以继续链式调用如：then catch
			return new MyPromise((resolve, reject) => {
				// 注意：如果传入的参数是一个空的可迭代对象，则永远为pending状态
				if (promiseList.length > 0) {
					promiseList.forEach((item) => {
						/**
						 * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，
						 * 则 Promise.race 将解析为迭代中找到的第一个值。
						 */
						MyPromise.resolve(item).then(resolve, reject);
					});
				}
			});
		} else {
			// 参数类型错误 直接结束
			throw TypeError('argument must be Array');
		}
	}
}

export default MyPromise;
