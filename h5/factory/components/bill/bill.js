
// 张树垚 2016-01-13 10:25:30 创建
// H5微信端 --- component-status 订单相关


define('h5-component-bill', function() {
	var bill = {
		statusClass: { // 订单状态对应class名称
			PROCESSING: 'going',
			SUCCESS: 'success',
			FAILURE: 'fail',
			CLOSE: 'close'
		},
		statusZhCN: { // 订单状态对应中文
			PROCESSING: '进行中',
			SUCCESS: '交易成功',
			FAILURE: '交易失败',
			CLOSE: '交易关闭'
		}
	};
	return bill;
});


