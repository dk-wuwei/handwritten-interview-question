let str = `
	张三：010-1234567，李四：021-1234567
`;

console.log(str.match(/[^\s\d-：，]+/g));

let reg = /<(h[1-6])>([\s\S]+?)<\/\1>/gi;

const temp = '<h1>1</h1><h1>2</h1>'.matchAll(reg);

const res = [];

for (const str of temp) {
	res.push(str[2]);
}

console.log(res);
