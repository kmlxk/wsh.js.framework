(function(){
if (typeof __framework_js != 'undefined') {return;} __framework_js = true;


require('wsh.js.framework/base.js')
require('wsh.js.framework/common.lang.js')
require('wsh.js.framework/system.js')
require('wsh.js.framework/system.io.js')


// JScript����Ľű�������cscript.exe�Ѿ����Ժܺõ�ʶ������"�а����ո�Ĳ���
// ���ﲻ�ù���Ĳ���
CmdLineParser = function(args, undefined) {
	this.args = args;
	this.switches = [];
	this.params = [];
	for (var i = 0; i < args.length; i++) {
		var swit = {},
			ch = args[i].substr(0,1);
		if (ch == '-' || ch == '/') {
			swit = args[i].substr(1);
			this.switches.push(swit);
		} else {
			this.params.push(args[i]);
		}
	}
};


})();