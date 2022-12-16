// 防抖：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
// 场景：接了一个任务，直到到5秒后执行完这个任务，你才可以再次给我布置任务。
const throttle = (fn, delay = 500) => {
	return (...args) => {
		if (fn.timer) return;
		fn.timer = setTimeout(() => {
			Reflect.apply(fn, this, args);
			fn.timer = null;
		}, delay);
	};
};

// 每次触发事件时都获取当前时间，并判断上次触发时的时间与当前时间的差值小于规定的执行时间，
// 若小于直接退出，大于则再次执行。
const throttle2 = (fn, delay = 500) => {
	let lastTime = 0;
	return (...args) => {
		const nowTime = new Date().getTime();
		if (nowTime - lastTime < delay) return;
		lastTime = nowTime;
		Reflect.apply(fn, this, args);
	};
};
