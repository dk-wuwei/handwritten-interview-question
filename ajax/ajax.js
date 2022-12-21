class XHR {
	constructor() {
		if (XHR.xhr) {
			return XHR.xhr;
		}
		if (window.XMLHttpRequest) {
			// IE7+ 统一的标准
			XHR.xhr = new XMLHttpRequest();
		} else {
			// IE7 以下兼容写法 参数固定
			XHR.xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		return XHR.xhr;
	}
}

// const xhr = new XHR();
const xhr = new XMLHttpRequest();

// 同步
xhr.open('get', 'https://jsonplaceholder.typicode.com/todos/1', false);
xhr.send();

if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
	console.log(xhr.responseText);
}

// 异步
xhr.open('get', 'https://jsonplaceholder.typicode.com/todos/1', true);
xhr.send();

// if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
// 	console.log(xhr.responseText);
// }

// xhr.readyState
// 0 未初始化
// 1 启动
// 2 发送
// 3 接受
// 4 完成

// 监听 readyState 方式
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		if ((this.status >= 200 && this.status < 300) || this.status === 304) {
			console.log(this.responseText);
		}
	}
};

// onload  完成时
xhr.onload = function () {
	if ((this.status >= 200 && this.status < 300) || this.status === 304) {
		console.log(this.responseText);
	}
};
