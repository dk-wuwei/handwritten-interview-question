let arr = [
	{ id: 1, menuPath: '/views/dashBoard/index.vue', menuName: '一级', pid: '0' },
	{ id: 2, menuPath: '/views/dashBoard/index.vue', menuName: '二级', pid: '1' },
	{ id: 3, menuPath: '/views/dashBoard/index.vue', menuName: '二级', pid: '1' },
	{ id: 4, menuPath: '/views/dashBoard/index.vue', menuName: '三级', pid: '2' },
	{ id: 5, menuPath: '/views/dashBoard/index.vue', menuName: '三级', pid: '3' },
	{ id: 6, menuPath: '/views/dashBoard/index.vue', menuName: '四级', pid: '5' },
	{ id: 7, menuPath: '/views/dashBoard/index.vue', menuName: '一级', pid: '0' },
];

// 注意对数据有要求 需要数据的id 大于 pid
const formatTree = (arr, pid = '0') => {
	let kData = {}; // 以id做key的对象 暂时储存数据
	let lData = []; // 最终的数据 arr

	arr.forEach((m) => {
		kData[m.id] = m; // 把每一项元素都作为KData的key
		if (m.pid === pid) {
			// 判断是不是父节点
			lData.push(kData[m.id]); // 是父节点就先存入lData中
		} else {
			// 不是父节点
			// kData中数据的children是否有存在 有就等于当前的children 没有就赋值空数组
			kData[m.pid].children = kData[m.pid].children || [];
			kData[m.pid].children.push(kData[m.id]); // 添加子节点数据
		}
	});

	return lData; // 最终的数据
};

// 测试
formatTree(arr);
