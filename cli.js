#!/usr/bin/env node

// bring in all the tools needed for text display
var figlet = require('figlet');
var clear = require('clear');
var yargs = require('yargs').argv;
var log = require('./src/utilities/mk-loggers')
var path = require('path');
var fs = require('fs');
global.ROOT_DIR = path.resolve(__dirname);
const pdfCliTest = require('./src/experimental/pdf-cli-test')

clear();

console.log(figlet.textSync('testbot'));

console.log("\nlaunching the tools with yargs . . .\n\n");
log.magenta(yargs)

pdfCliTest()

log.yellow(`done`)



