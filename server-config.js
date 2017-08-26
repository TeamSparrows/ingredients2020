var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./route-handler');
var logger = require('morgan')
var app = express();

app.use(logger('dev'));
//middleware
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.static(path.join(__dirname, 'build')));

//routes
app.post('/api/ingredients', handler.ingredients);
app.post('/api/pastSearches', handler.pastSearches);
app.post('/api/image', handler.googleCloudSearch);
app.get('/callback', handler.callback);
app.post('/api/findOrCreateUser', handler.findOrCreateUser);

module.exports = app;
