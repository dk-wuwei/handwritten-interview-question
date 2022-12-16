class EventEmeitter {
	constructor() {
		// 用Map 键值对结构存储事件
		this._events = this._events || new Map();
	}
}

// emit 触发事件
EventEmeitter.prototype.emit = function (type, ...args) {
	// 获取到订阅的事件 Reflect.apply()执行触发事件
	this._events.get(type).forEach((event) => Reflect.apply(event, this, args));

	return true;
};

// addListener 添加事件
EventEmeitter.prototype.addListener = function (type, fn) {
	// 获取对应事件名称的函数清单
	const handlers = this._events.get(type) || [];

	// 支持多个订阅 故是数组 进行push
	handlers.push(fn);

	// 重新赋值
	this._events.set(type, handlers);
};

// removeListener 删除事件
EventEmeitter.prototype.removeListener = function (type, fn) {
	// 找到对应的事件
	const handlers = this._events.get(type);

	// 函数体字符串是否全等 找到下标
	const position = handlers.findIndex((f) => f === fn);

	// 下标存在删除此项
	position !== -1 && handlers.splice(position, 1);
};

// 创建实例
const emitter = new EventEmeitter();

// 测试
emitter.addListener('arson', (man) => {
	console.log(`expel ${man}`);
});
const a = (man) => {
	console.log(`save ${man}`);
};

emitter.addListener('arson', a);
emitter.removeListener('arson', a);

emitter.emit('arson', 'low-end');
