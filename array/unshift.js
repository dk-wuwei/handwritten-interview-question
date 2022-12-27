Array.prototype.myUnshift1 = function () {
	let pop = 0;
	for (let i = 0; i < arguments.length; i++) {
		this.splice(pop, 0, arguments[i]);
		pop++;
	}

	return this.length;
};

const arr1 = [1, 2];
console.log(arr1.myUnshift1('0'), arr1);

Array.prototype.myUnshift2 = function () {
	const args = Array.prototype.slice.call(arguments);
	const newArr = args.concat(this);
	return newArr;
};

const arr3 = [1, 2];
const arr4 = arr3.myUnshift2('0');
console.log(arr4);

let t = [];
console.log(t.push('!', '@'), t);
