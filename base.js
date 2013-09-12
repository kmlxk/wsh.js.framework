(function(){
if (typeof __base_js != 'undefined') {return;} __base_js = true;


// ��ȡȫ�ֱ����� window/this
getGlobal = function() {
	if (typeof(window) != 'undefined') {
		return window;
	}
	return this;
}
// ���������ռ�
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

// �����������������﹤���ܺã�WSH�б���
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

// ���������Windows.JScript�ű�ר�õ�
dump = function(obj) {
	var ret = [],
		k,
		field,
		begin = '',
		end = '';
	// �����object���ͣ���Ҫ����ÿһ��Ԫ��
	if (typeof(obj) == 'object') {
		// length����˵����һ������
		if (typeof(obj.length) != 'undefined') {
			// ͨ���±�ȷʵ���Է���
			if (typeof(obj[0]) != 'undefined') {
				// ��Ϊ�������
				begin = '[';
				for (k = 0; k < obj.length; k++) {
					field = obj[k];
					ret.push(k + ':' + dump(field));
				}
				end = ']';
			} else {
				// ��Ϊ��������
				begin = '(';
				for (k = 0; k < obj.length; k++) {
					field = obj(k);
					ret.push(k + ':' + dump(field));
				}
				end = ')';
			}
		} else {
			// û��length���ԣ���ͨ�Ķ��󣬿��Ա���keys
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
		// ��ֱֵ�ӷ���
		return ''+obj;
	}
	return begin + ret.join(', ') + end;
};



})();