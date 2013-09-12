(function(){
if (typeof __system_js != 'undefined') {return;} __system_js = true;

namespace('System');
System.Logger = function(name, level) {
	var self = System.Logger;
	self.TRACE = 0;
	self.DEBUG = 1;
	self.INFO = 2;
	self.WARN = 3;
	self.ERROR = 4;
	self.FATAL = 5;
	if (typeof(level) == 'undefined') {
		this.level = self.INFO;
	}
	this.name = name;
};
System.Logger.prototype = {
	log : function(msg) {
		WScript.Echo('' + msg);
	}
}

Console = function() {
	this.logger = new System.Logger('console', System.Logger.TRACE);
};
Console.prototype = {
	log: function() {
		for (var i = 0; i < arguments.length; i++) {
			this.logger.log(arguments[i]);
		}
	},
	debug: function() {
		this.log.apply(this, arguments);
	}
}
console = new Console();



Runtime = function(undefine) {
	// 静态变量, 用于缓存
	if (Runtime.shell == undefine) {
		Runtime.shell = WScript.CreateObject("WScript.Shell");
	}
	if (Runtime.fso == undefine) {
		Runtime.fso = new ActiveXObject("Scripting.FileSystemObject");
	}
	this.wsh = WScript;
	this.shell = Runtime.shell;
	this.fso = Runtime.fso;
	this.curdir = this.shell.CurrentDirectory;
	if (this.curdir.substr(this.curdir.length - 1, 1) != "\\") {
		this.curdir+="\\";
	}
};
Runtime.prototype = {
	requireRun: function(content) {
		var re = new RegExp("var\\s(\\w+)\\s=\\sfunction", "igm");
		return content.replace(re, function(){
			var groups = arguments;
			console.log(groups[1]);
		});
	},
	require: function(filename) {
		var tf = new System.IO.TextFile();
		var content = tf.read(filename);
		evel(content);
	},
	env: function(name) {
		return this.shell.Environment.Item(name);
	},
	cmd: function(cmd) {
		this.shell.Run(cmd);
	},
	test: function() {
	}
};
runtime = new Runtime();


})();