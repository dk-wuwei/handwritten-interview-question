// 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 场景：搜索栏搜索，避免造成了很多无用的请求。
const debounce = (fn, delay) => {
	return (...args) => {
		clearTimeout(fm.timer);
		fn.timer = setTimeout(() => {
			Reflect.apply(fn, this, args);
		}, delay);
	};
};
