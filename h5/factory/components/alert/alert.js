
// 张树垚 2015-12-25 14:07:17 创建
// H5微信端 --- components-alert


define('h5-alert', function() {
	var time = 2000; // 停留时间
	var dom = $('.alert');
	if (!dom.length) {
		dom = $('<div class=".alert"></div>').appendTo(document.body);
	}
	var timer = null;
	var handler = {};
	var callback = function() {
		dom.off(handler).hide().removeClass('show hide');
	};
	handler[$.fx.animationEnd] = callback;
	handler[$.fx.transitionEnd] = callback;
	return $.alert = function(message, onHide) {
		dom.html(message).show();
		clearTimeout(timer);
		setTimeout(function() {
			dom.addClass('show');
			timer = setTimeout(function() {
				dom.on(handler).addClass('hide');
				onHide && setTimeout(onHide, 1000);
			}, time);
		}, 10);
	};
});