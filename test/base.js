__WSH_JS_FRAMEWORK_DIR = 'K:\\scripts\\wsh.js.framework\\';
function require(filename) {
	if (typeof(__fso) == 'undefined') {
		__fso = new ActiveXObject("Scripting.FileSystemObject");
	}
	var f = __fso.OpenTextFile(__WSH_JS_FRAMEWORK_DIR + filename, 1), ret = "";
	while (!f.AtEndOfStream) {
		ret += f.ReadLine() + "\n";
	}
	f.Close();
	eval(ret);
}
require('framework.js');

var filename;
filename = 'f:\\apps\\EditPlus\\tools\\jsFormatter.utf.js';
Assert.equal('jsFormatter.utf.js', System.IO.FileSystem.getFilename(filename));
Assert.equal('js', System.IO.FileSystem.getExt(filename));
Assert.equal('f:\\apps\\EditPlus\\tools', System.IO.FileSystem.getPath(filename));
filename = 'jsFormatter.utf.js';
Assert.equal('jsFormatter.utf.js', System.IO.FileSystem.getFilename(filename));
Assert.equal('js', System.IO.FileSystem.getExt(filename));
Assert.equal('', System.IO.FileSystem.getPath(filename));
Assert.statistic();