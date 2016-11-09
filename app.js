/**
 * Created by Administrator on 2016/1/9.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    config = require('./config');

var app = express();

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('views', __dirname + '/' + 'views');
app.use(express.static('public'));

routes.setRequestUrl(app);

/*connect to database*/
var server = app.listen(config.port, function () {
    var address = server.address().address;
    var port = server.address().port;
    console.log('server has started and address: ' + address + ' port: ' + port);
});
