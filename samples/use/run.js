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

// Ӧ�ó���ʼ
var App = function() {
    this.title = 'run-app';
    this.version = 'v1.0';
    // Ԥ�����õ�Ӧ�ó���·��
    this.pathes = {
        'prog' : 'F:\\Program Files\\',
        'app' : 'F:\\apps\\'
    };
};

App.prototype = {
    help : function() {
        console.log(this.title + ' ' + this.version);
        console.log("���ٵ���Ӧ�ó���");
        console.log("ʾ����run firework");
    },
    // ��ȡ�ļ����µ�ȫ��exe
    getExe : function(name, path) {
        var ret = [],
        folder = runtime.fso.GetFolder(path),
        subfolder = '',
        e = new Enumerator(folder.Files);   
        for (;!e.atEnd(); e.moveNext()) {
            subfolder = e.item().Name;
            if (typeof subfolder == 'undefined') {
                continue;
            }
            if (subfolder.toLowerCase().indexOf('.exe') >= 0) {
                ret.push(path + subfolder);
            }
        }
        return ret;
    },
    // ��ȡƥ�����Ƶ�exe�ļ�
    getMatchExe : function(name, path) {
        var ret = [],
        folder = runtime.fso.GetFolder(path),
        subfolder = '',
        e = new Enumerator(folder.Files);   
        for (;!e.atEnd(); e.moveNext()) {
            subfolder = e.item().Name;
            if (typeof subfolder == 'undefined') {
                continue;
            }
            if (subfolder.toLowerCase().indexOf(name) >= 0 &&
                subfolder.toLowerCase().indexOf('.exe') >= 0) {
                ret.push(path + subfolder);
            }
        }
        return ret;
    },
    // ����ƥ����ļ���
    findDir : function(name, path) {
        var ret = [],
        folder = runtime.fso.GetFolder(path),
        subfolder = '',
        e = new Enumerator(folder.SubFolders);
        for (;!e.atEnd(); e.moveNext()) {
            subfolder = e.item().Name;
            if (subfolder.toLowerCase().indexOf(name) >= 0) {
                ret.push(path + subfolder + '\\');
            }
        }
        return ret;
    },
    // ���
    main : function() {
        // command line
        var cp = new CmdLineParser(function2Array(WScript.Arguments));
        if (cp.params.length == 0 ||
            cp.switches.contains('?') ||
            cp.switches.contains('h')
            ) {
            this.help();
            return;
        }
        // search apps in dirs
        var dirs = [];
        for (var k in this.pathes) {
            if (typeof(this.pathes[k]) == 'function') {
                continue;
            }
            var ret = this.findDir(cp.params[0], this.pathes[k]);
            dirs = dirs.concat(ret);
        }
        // prepare to run
        if (dirs.length == 1) {
            // find matched exe file
            var ret = this.getMatchExe(cp.params[0], dirs[0]);
            if (ret.length == 0) {
                ret = this.getExe(cp.params[0], dirs[0]);
            }
            if (ret.length > 0) {
                console.log(ret[0]);
                runtime.shell.run('"' + ret[0] + '"');
            }
        } else if (dirs.length == 0) {
            console.log('δ�ҵ�Ӧ�ó���');
            console.read();
        } else {
            if (dirs.length > 10) {
                console.log('���Ʋ�Ψһ������10��Ӧ�ó���');
                return;
            }
            console.log('���Ʋ�Ψһ���ҵ����¶��Ӧ�ó���:');
            for(var i = 0; i < dirs.length; i++){
                console.log((i + 1) + ': ' + dirs[i]);
            }
            console.log('����������Ҫѡ��Ҫ���е�Ӧ�ó���:');
            var ch = console.read();
            var index = ch.charCodeAt(0) - '0'.charCodeAt(0) - 1;
            // find matched exe file
            var ret = this.getMatchExe(cp.params[0], dirs[index]);
            if (ret.length == 0) {
                ret = this.getExe(cp.params[0], dirs[index]);
            }
            if (ret.length > 0) {
                console.log(ret[0]);
                runtime.shell.run('"' + ret[0] + '"');
            }
        }
    //tf.save(tmpfile, cmd)
    //runtime.shell.run(tmpfile);
    }
};
var app = new App();
app.main();
