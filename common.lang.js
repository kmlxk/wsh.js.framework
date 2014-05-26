(function(){
	if (typeof __common_lang_js != 'undefined') {
		return;
	}
	__common_lang_js = true;

	namespace('$');
	$.isFunction = function(f) {
		return typeof(f) == 'function';
	};

	String.prototype.trim = function(){
		if(!$.isFunction(this.replace)) {
			return null;
		}
		return this.replace(/^\s+|\s+$/g,"")
	};
	String.prototype.ltrim = function(){
		if(!$.isFunction(this.replace)) {
			return null;
		}
		return this.replace(/^\s+/g,"")
	};
	String.prototype.rtrim = function(){
		if(!$.isFunction(this.replace)) {
			return null;
		}
		return this.replace(/\s+$/g,"")
	};
	// �����ַ��ĳ��ȣ�һ��������2��
	String.prototype.ChineseLength=function() {
		if(!$.isFunction(this.replace)) {
			return null;
		}
		return this.replace(/[^\x00-\xff]/g,"**").length;
	};
	// �ж��ַ����Ƿ���ָ�����ַ�������
	String.prototype.endsWith = function(str) {
		return this.substr(this.length - str.length) == str;
	};
	// �ж��ַ����Ƿ���ָ�����ַ�����ʼ
	String.prototype.startsWith = function(str) {
		return this.substr(0, str.length) == str;
	};
	
	/** ��ȡ�ַ����Ĺ�ϣֵ 
* @param {String} str 
* @param {Boolean} caseSensitive 
* @return {Number} hashCode 
*/
	//��ͬ��java�е�hashCode();
	String.prototype.hashCode = function () {
		var hash = 0,
		str = this,
		ch;
		if (str === undefined || str.length == 0)
			return hash;
		for (i = 0; i < str.length; i++) {
			ch = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + ch;
			hash = hash & hash; // Convert to 32bit integer  ( javascript�е�intֵ��java�������� )
		}
		return hash;
	};

	String.prototype.lowerFirstChar = function () {
		var str = this;
		if (str == undefined || str.length == 0) {
			return str;
		}
		return str.substr(0, 1).toLowerCase() + str.substr(1);
	}

	/**
 * ʱ�����ĸ�ʽ��;
 */
	Date.prototype.format = function(format) {
		/*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
		var o = {
			"M+" :this.getMonth() + 1, // month
			"d+" :this.getDate(), // day
			"h+" :this.getHours(), // hour
			"m+" :this.getMinutes(), // minute
			"s+" :this.getSeconds(), // second
			"q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
			"S" :this.getMilliseconds()
		// millisecond
		}

		if (/(Y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
		}

		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}
	
	ArrayHelper = {};
	ArrayHelper.contains = function(list, item) {
		for (var i = 0; i < list.length; i++) {
			if (list[i] == item) {
				return true;
			}
		}
		return false;
	}
	ArrayHelper.containsKey = function(list, item) {
		for (var k in list) {
			if (k == item) {
				return true;
			}
		}
		return false;
	}
	ArrayHelper.containsValue = function(list, item) {
		for (var k in list) {
			if (this[k] == item) {
				return true;
			}
		}
		return false;
	}


})();