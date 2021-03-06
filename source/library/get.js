
// 张树垚 2015-12-25 17:45:48 创建
// 公用 --- get


define(function() {
	var parse = function(str) {
		var data = {};
		str.split('&').forEach(function(item) {
			var arr = item.split('=');
			data[arr[0]] = arr[1];
		});
		return data;
	};
	var stringify = function(data) {
		var arr = [];
		for(var i in data) {
			if (data.hasOwnProperty(i)) {
				arr.push(i + '=' + data[i]);
			}
		};
		return arr.join('&');
	};
	/**
	 * [add 链接后加在参数]
	 * @Author   张树垚
	 * @DateTime 2015-12-27T14:30:34+0800
	 * @param    {[string]}            href    [链接地址]
	 * @param    {[string|json]}       data    [添加数据]
	 */
	var add = function(href, data) {
		if (typeof data !== 'string') {
			data = stringify(data);
		}
		href = href.trim();
		data = data.trim();
		if (href.indexOf('?') > -1) {
			if (href.match(/\&$/)) {
				return href + data;
			} else {
				return href + '&' + data;
			}
		} else {
			return href + '?' + data;
		}
	};
	return {
		data: parse(location.search.replace(/^\?/, '')),
		parse: parse,
		stringify: stringify,
		add: add
	};
});
