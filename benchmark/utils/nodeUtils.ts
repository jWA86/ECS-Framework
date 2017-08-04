const fs = require('fs');
const os = require('os');

function writeRes(res, path) {
    let p = path + "/" + Date.now() + ".json";
    
    let date = JSON.stringify(new Date()+", ");
    let cpu = {"cpu":os.cpus(), "platform":os.platform() };
    let r = res;
    let o = {"date": date, "os": cpu, "data": r}
    let buffer = new Buffer(JSON.stringify(o));
        fs.writeFile(p, buffer, 0, buffer.length, null, function (err) {
            if (err) throw 'error writing file: ' + err;
            else{console.log("results written in "+path)}
        });
}

export { writeRes }