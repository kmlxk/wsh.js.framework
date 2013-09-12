(function(){
if (typeof __framework_js != 'undefined') {return;} __framework_js = true;


require('base.js')
require('common.lang.js')
require('system.js')
require('system.io.js')


// JScript本身的脚本解析器cscript.exe已经可以很好的识别引号"中包含空格的参数
// 这里不用过多的操作
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