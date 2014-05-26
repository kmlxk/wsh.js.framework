(function(){
if (typeof __system_io_js != 'undefined') {return;} __system_io_js = true;

namespace('System.IO');

System.IO.FileSystem = function(undefine) {
	// 静态变量, 用于缓存
	if (System.IO.FileSystem.fso == undefine) {
		System.IO.FileSystem.fso = new ActiveXObject("Scripting.FileSystemObject");
	}
	this.fso = System.IO.FileSystem.fso;
};

extend(System.IO.FileSystem, {
	mkdir: function(path) {
		if (!System.IO.FileSystem.fso.FolderExists(path)) {
			System.IO.FileSystem.fso.CreateFolder(path);
		}
	},
	getExt: function(filepath, ds) {
		if (ds == undefine) {
			ds = '.';
		}
		var pos = filepath.lastIndexOf(ds);
		if (pos == -1) {
			return '';
		}
		var len = filepath.length;
		return filepath.substring(pos + 1, len);
	},
	getFilename: function(filepath, ds) {
		if (ds == undefine) {
			ds = '\\';
		}
		var pos = filepath.lastIndexOf(ds);
		if (pos == -1) {
			return filepath;
		}
		var len = filepath.length;
		return filepath.substring(pos + 1, len);
	},
	getPath: function(filepath, ds) {
		if (ds == undefine) {
			ds = '\\';
		}
		var pos = filepath.lastIndexOf(ds);
		if (pos == -1) {
			return '';
		}
		return filepath.substring(0, pos);
	},
	deleteFile: function(filename) {
		f1 = runtime.fso.GetFile(filename);
		f1.Delete();
	},
	getSubFiles: function(path) {    
            var ret = [],
            folder = runtime.fso.GetFolder(path),
            subfolder = '',
            e = new Enumerator(folder.Files);
            for (;!e.atEnd(); e.moveNext()) {
                subfolder = e.item().Name;
                ret.push(path + '\\' + subfolder);
            }
            return ret;
	},
	getSubFolders: function(path) {
            var ret = [],
            folder = runtime.fso.GetFolder(path),
            subfolder = '',
            e = new Enumerator(folder.SubFolders);
            for (;!e.atEnd(); e.moveNext()) {
                subfolder = e.item().Name;
                ret.push(path + '\\' + subfolder);
            }
            return ret;
	}
});
FileSystem = new System.IO.FileSystem();



})();