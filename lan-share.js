#!/usr/bin/env node
var finalhandler = require('finalhandler');
var http         = require('http');
var localIp      = require('./local-ip');
var serveIndex   = require('serve-index');
var serveStatic  = require('serve-static');

var path = process.argv[2] || process.env['PWD'];
var port = process.argv[3] || 9527;

console.log("\n######## LAN Share ########\n");
console.log(`Sharing ${path} on:\n`);
localIp().forEach(ip => {
  console.log(`${ip.name}\thttp://${ip.address}:${port}`);
});

var index = serveIndex(path, {'icons': true, 'view': 'details'});

var serve = serveStatic(path);

http.createServer(function onRequest(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, function onNext(err) {
    if (err) return done(err);
    index(req, res, done);
  });
}).listen(port);
