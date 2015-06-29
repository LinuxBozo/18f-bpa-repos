'use strict';
var express = require('express');
var BPAData = require('./build');
var app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendfile('/index.html');
});
app.get('/repos', function(req, res) {
    BPAData.doAllSearches()
    .then(function(data) {
        return res.json(data);
    });
});
var port = process.env.PORT || 9000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});