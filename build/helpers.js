var shell = require("shelljs");
var fs = require("fs");
var through2 = require("through2");
var path = require("path");

function shellExec(command, options, desc) {
    return new Promise(function(resolve, reject) {
        options = options || {};

        if(options.openNewCommandWindow) {
            if(process.platform == "win32") {
                command = "START " + command;
            }
        }

        var res = shell.exec(command, options, function (code) {
            if (code != 0) {
                reject(new Error("Command \"" + command + "\" failed with exit code: " + code));
            }
            else {
                resolve();
            }
        });
    });
}

function renameAndSave(ext) {
    return through2.obj(function (file, enc, callback) {
        var parts = path.parse(file.path);
        var outputPath = parts.dir + "/" + parts.name + "." + ext;

        fs.writeFileSync(outputPath, file._contents, enc);

        callback(null, file);
    });
}

function delay(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
}

module.exports = {
    shellExec: shellExec,
    renameAndSave: renameAndSave,
    delay: delay,
};
