var express     = require('express'),
    bodyParser  = require("body-parser"),
    favicon     = require('serve-favicon'),
    app         = express(),
    port        = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5555,
    ip          = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

console.log('Server running at...\nhttp://localhost:'+port);

app .use(express.static('www'))
    .use(express.static('node_modules'))
    .use(favicon(__dirname + '/www/images/favicon.ico'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/',function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.sendFile('index');
    });

var db = require('./db.js');
db(app);

// app.listen(port, ip);
app.listen(port);
