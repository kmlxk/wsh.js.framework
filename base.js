(function(){
if (typeof __base_js != 'undefined') {return;} __base_js = true;


// 获取全局变量， window/this
getGlobal = function() {
	if (typeof(window) != 'undefined') {
		return window;
	}
	return this;
}
// 声明命名空间
namespace = function(names, undefined) {
	var sep = names.split('.'),
		i,
		scope = getGlobal();
	for (i = 0; i < sep.length; i++) {
		if (scope[sep[i]] == undefined) {
			scope[sep[i]] = {};
		}
		scope = scope[sep[i]];
	}
}

extend = function(src, dest) {
	for (var k in src) {
		dest[k] = src[k];
	}
};

function2Array = function(args) {
	var ret = [],
		i = 0;
	for (i = 0; i < args.length; i++) {
		ret.push(args(i));
	}
	return ret;
}

// 这个函数是在浏览器里工作很好，WSH中报错
dump2 = function(kv) {
	var ret = [];
	if (typeof(kv) == 'object') {
		for (var k in kv) {
			ret.push(k + ': ' + ie_dump(kv[k]));
		}
		return "{"+ret.join(',')+"}";
	} else if (typeof(kv) == 'string') {
		return '"'+kv+'"';
	} else {
		return kv;
	}
	return kv;
}

// 这个函数是Windows.JScript脚本专用的
dump = function(obj) {
	var ret = [],
		k,
		field,
		begin = '',
		end = '';
	// 如果是object类型，需要遍历每一个元素
	if (typeof(obj) == 'object') {
		// length属性说明是一个数组
		if (typeof(obj.length) != 'undefined') {
			// 通过下标确实可以访问
			if (typeof(obj[0]) != 'undefined') {
				// 作为数组访问
				begin = '[';
				for (k = 0; k < obj.length; k++) {
					field = obj[k];
					ret.push(k + ':' + dump(field));
				}
				end = ']';
			} else {
				// 作为函数访问
				begin = '(';
				for (k = 0; k < obj.length; k++) {
					field = obj(k);
					ret.push(k + ':' + dump(field));
				}
				end = ')';
			}
		} else {
			// 没有length属性，普通的对象，可以遍历keys
			begin = '{';
			for (k in obj) {
				field = obj[k];
				ret.push(k + ':' + dump(field));
			}
			end = '}';
		}
	} else if (typeof(obj) == 'string') {
		return '"'+obj+'"';
	} else {
		// 单值直接返回
		return ''+obj;
	}
	return begin + ret.join(', ') + end;
};



})();