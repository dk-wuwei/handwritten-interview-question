// 实现bind

/* 
bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式
对于直接调用来说，这里选择了apply的方式实现，但对于参数需要注意：因为bind可以实现类似这样的代码 f.bind(obj, 1)(2)，所以需要将两边的参数拼接起来
对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this
*/

Function.prototype.myBind = function (context, ...outerArgs) {
	// this->func context->obj outerArgs->[10,20]
	let self = this;

	// 返回一个函数
	return function F(...innerArgs) {
		// 返回了一个函数，...innerArgs为实际调用时传入的参数

		// 考虑new的方式
		if (self instanceof F) {
			return new self(...outerArgs, ...innerArgs);
		}

		// 把func执行，并且改变this即可
		return self.apply(context, [...outerArgs, ...innerArgs]); //返回改变了this的函数，参数合并
	};
};
