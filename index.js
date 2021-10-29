var fs = require('fs');
var path = require('path');
var archiver = require('archiver');

// ccfp-record-202110291600.xlsx
// var output = fs.createWriteStream(path.join(__dirname, "result.zip"));

let files = fs.readdirSync('./files', {withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => item.name)

let m = files.find((file) => file === "configuration.txt")
console.log(m === undefined);
archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'));

var output = fs.createWriteStream(__dirname + `/zips/${Date()}.zip`);

var archive = archiver('zip-encryptable', {
    zlib: { level: 9 },
    forceLocalTime: true,
    password: 'test'
});
archive.pipe(output);
archive.directory(__dirname+'/files/', 'ccfp-record-202110291733.xlsx')

archive.finalize();

console.log(__dirname+'/files/', 'ccfp-record-202110291733.xlsx');