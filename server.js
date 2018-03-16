var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
    console.log('User connected to /');

    // res.write('Hello World');
    res.sendFile(path.join(__dirname + '/app/views/index.html'));
});

app.listen(8080, function() {
    console.log('Server started');
});