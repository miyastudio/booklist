var express = require('express');
var app = express();

var fs = require('fs'); // 此模板引擎依赖 fs 模块
var readjson = require('readjson');

app.engine('html', function (filePath, options, callback) { // 定义模板引擎
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        return callback(null, content.toString());
    })
});
app.set('views', './views'); // 指定视图所在的位置
app.set('view engine', 'html'); // 注册模板引擎


app.use('/static', express.static('public'));
app.use('/jsons', express.static('jsons'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/lib', express.static('bower_components'));


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/books', function (req, res) {
    readjson('./jsons/books.json', function (error, json) {
        if (error)
            console.error(error.message);
        else
            res.json(json);
    });
});

app.get('/book/:id', function (req, res) {
    res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/book', function (req, res) {
    res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/book/:id', function (req, res) {
    res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/book/:id', function (req, res) {
    res.send('Got a DELETE request at /user');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
