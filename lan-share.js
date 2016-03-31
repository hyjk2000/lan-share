#!/usr/bin/env node
var express    = require('express');
var serveIndex = require('serve-index');
var localIp    = require('./local-ip');

var app  = express();
var path = process.argv[2] || process.env['PWD'];
var port = process.argv[3] || 9527;

console.log("\n######## LAN Share ########\n");
console.log(`Sharing ${path} on:\n`);
localIp().forEach(ip => {
  console.log(`${ip.name}\thttp://${ip.address}:${port}`);
});

app.use(serveIndex(path, {'icons': true, 'view': 'details'}));
app.use(express.static(path));
app.listen(port);
