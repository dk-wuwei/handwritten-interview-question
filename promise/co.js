/**
 * async await 原理 伪代码
 * 其使用的是 co 模块 npm i co -D
 */
function co(gen) {
	return new Promise((resolve, reject) => {
		const next = (data) => {
			const { value, done } =
				typeof gen === 'function' ? gen().next(data) : gen.next(data);
			if (done) {
				resolve(value);
			} else {
				Promise.resolve(value).then((res) => {
					next(res);
				}, reject);
			}
		};

		next();
	});
}

function* test() {
	var result = yield Promise.resolve(true);
	return result;
}

co(test()).then(
	function (value) {
		console.log(value);
	},
	function (err) {
		console.error(err.stack);
	}
);
