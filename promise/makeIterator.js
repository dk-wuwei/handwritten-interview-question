/**
 * 迭代器对象 伪代码
 */
function makeIterator(arr) {
	let index = 0;
	return {
		next() {
			if (index < arr.length) {
				// 注意 index++ 的返回值是当前的 index 之后才会改变index
				// 如：0++ 返回 0 可以理解为 下一行代码开始 就是 1 了
				return { value: arr[index++], done: false };
			}
			return { value: undefined, done: true };
		},
	};
}

const arr = [1, 2, 3, 4];

const iter = makeIterator(arr);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: undefined, done: true }
*/
