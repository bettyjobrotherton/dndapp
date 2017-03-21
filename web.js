var gzippo = require('gzippo');
var express = require('express');
var logger = require('express-logger');
var app = express();

app.use(logger({path: 'logfile.txt'}));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
