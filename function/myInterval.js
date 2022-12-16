// 模拟setInterval
const Interval = (func, millisecond) => {
	function fn() {
		func(); // 回调函数
		setTimeout(fn, millisecond); // 接着两秒后执行回调函数 func()  一直重复执行
	}
	setTimeout(fn, millisecond); // 一秒后执行回调函数 func()
};

// 测试
Interval(like, 1000);

function like() {
	console.log('first');
}
