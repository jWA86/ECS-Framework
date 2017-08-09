"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var os = require('os');
function writeRes(res, path) {
    var p = path + "/" + Date.now() + ".json";
    var date = JSON.stringify(new Date() + ", ");
    var cpu = { "cpu": os.cpus(), "platform": os.platform() };
    var r = res;
    var o = { "date": date, "os": cpu, "data": r };
    var buffer = new Buffer(JSON.stringify(o));
    fs.writeFile(p, buffer, 0, buffer.length, null, function (err) {
        if (err)
            throw 'error writing file: ' + err;
        else {
            console.log("results written in " + path);
        }
    });
}
exports.writeRes = writeRes;
