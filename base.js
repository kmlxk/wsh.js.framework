(function(){
if (typeof __base_js != 'undefined') {return;} __base_js = true;

print = function(msg) {
	WScript.Echo(msg);
};
Template = function(temp, data) {
	return temp.replace(/\{\$(.*?)\}/g,
	function($0, $1, $2, $3, D) {
		var A = $1.split('.'),
		F = A.slice(1).join('.'),
		e = D || data;
		return F ? arguments.callee($0, F, $2, $3, e[A[0]]) : (e[$1]!=undefine? e[$1] : $0);
	});
};

// 获取全局变量， window/this
global = getGlobal = function() {
	if (typeof(window) != 'undefined') {
		return window;
	}
	return this;
};
// 声明命名空间
namespace = function(names, undefine) {
	var sep = names.split('.'),
		i,
		scope = getGlobal();
	for (i = 0; i < sep.length; i++) {
		if (scope[sep[i]] == undefine) {
			scope[sep[i]] = {};
		}
		scope = scope[sep[i]];
	}
};

extend = function(dest, src) {
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
};

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
};

assertEqual = function(expect, actual, msg) {
	if (expect !== actual) {
		if (msg != undefine) {
			print(msg);
		}
		print(Template('!expect: {$exp}, but: {$act}', {
			exp: expect,
			act: actual
		}));
	}
};

dump = function(param, name, indent) {
	if (typeof param == 'object') {
		var _indent = indent ? indent: '';
		var info = name ? _indent + name + ' : {\n': '{\n';
		indent = _indent + '\t';
		for (var key in param) {
			if (typeof param[key] == 'object') {
				info += dump(param[key], key, indent);
			} else {
				if (typeof param[key] == 'string') {
					param[key] = '\"' + param[key] + '\"';
				}
				info += indent + key + ' : ' + param[key] + ',\n';
			}
		}
		info = info.replace(/,\n$/i, '\n');
		return name ? info + _indent + '},\n': info + '}';
	} else {
		return param;
	}
};


Assert = function() {
};
extend(Assert, {
	_total: 0,
	_error: 0,
	equal: function(expect, actual, msg) {
		Assert._total++;
		if (expect !== actual) {
			Assert._error++;
			if (msg != undefine) {
				print(msg);
			}
			print(Template('!expect: {$exp}, but: {$act}', {
				exp: expect,
				act: actual
			}));
		}
	},
	statistic: function() {
		print(Template('[Assert] total: {$total}, error: {$error}', {
			total: Assert._total,
			error: Assert._error
		}));		
	}
});

})();