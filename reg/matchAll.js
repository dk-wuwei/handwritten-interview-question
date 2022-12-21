String.prototype.matchAll = function (reg) {
	const res = this.match(reg);

	if (res) {
		// 将匹配到的字符替换为 ^
		const str = this.replace(res[0], '^'.repeat(res[0].length));

		// 再次调用 matchAll 进行匹配 注意如果匹配不到 设置为空数组
		const match = str.matchAll(reg) || [];

		// 返回一个可迭代数据
		return [res, ...match];
	}
};

const str = `<h1>1</h1><h1>2</h1>`;

const reg = /<(h[1-6])>([\s\S]+?)<\/\1>/i;

const res = str.matchAll(reg);

for (const iterator of res) {
	console.log(iterator);
}
