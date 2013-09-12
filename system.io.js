(function(){
if (typeof __system_js != 'undefined') {return;} __system_js = true;

namespace('System.IO');

System.IO.FileSystem = function(undefine) {
	// 静态变量, 用于缓存
	if (System.IO.FileSystem.fso == undefine) {
		System.IO.FileSystem.fso = new ActiveXObject("Scripting.FileSystemObject");
	}
	this.fso = System.IO.FileSystem.fso;
}
System.IO.FileSystem.prototype = {
	Delete: function(filename) {
		f1 = this.fso.GetFile(filename);
		f1.Delete();
	}
}
FileSystem = new System.IO.FileSystem();

System.IO.TextFile = function(undefine) {
	// 静态变量, 用于缓存
	if (System.IO.TextFile.fso == undefine) {
		System.IO.TextFile.fso = new ActiveXObject("Scripting.FileSystemObject");
	}
	this.fso = System.IO.TextFile.fso;
}

System.IO.TextFile.prototype = {
	save: function(filename, content) {
		f1 = this.fso.CreateTextFile(filename, true); //创建一个文件夹
		f1.Write(content) ;
		f1.Close();//关闭
	},
	read: function(filename) {
		var f1 = this.fso.OpenTextFile(filename, 1); 
		var ret = "";
		while (!f1.AtEndOfStream)
			ret += f1.ReadLine()+"\n";
		f1.Close();
		return ret; 
	}
}

})();