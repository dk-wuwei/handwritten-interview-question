// 手写实现storage 可设置过期时间
const storage = {
	prefix: 'dk',
	timeSign: '|dk|',
	setItem(key, value, time) {
		// 做一个key的保护
		key = `${this.prefix}${key}`;

		// 没有传入时间，默认过期时间是一个月，当然也可以是其他时间或者不设置
		time = time
			? new Date(time).getTime()
			: Date.now() + 24 * 60 * 60 * 31 * 1000;

		// 构造一个形如 1646094676134|dk|"今天周四" 结构的字符串
		window.localStorage.setItem(
			key,
			`${time}${this.timeSign}${JSON.stringify(value)}`
		);
	},
	getItem(key) {
		key = `${this.prefix}${key}`;
		let value = window.localStorage.getItem(key);

		if (value) {
			// 找到索引
			let index = value.indexOf(this.timeSign);

			// 截取事件 ‘+’ 转化为Number
			let time = +value.slice(0, index);

			// 判断时间是否已过期
			if (time > Date.now()) {
				value = JSON.parse(value.slice(index + this.timeSign.length)); // json parse 转化为object
			} else {
				value = null;
				window.localStorage.removeItem(key);
			}
		}

		return value;
	},
};

// 测试

storage.setItem('name', '今天周四', Date.now() + 100 * 1000); // dkname  1646273256360|dk|"今天周四"
storage.getItem('name'); // 今天周四

// 100s later
storage.getItem('name'); // null

storage.setItem('obj', { name: 'dk', age: 18 }, Date.now() + 100 * 1000); // dkobj   1646273256363|dk|{"name":"dk","age":18}

storage.getItem('obj'); // { name: 'dk', age: 18 }
