var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var task = require('./routes/task');
var app = express();
//获取参数的中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//cors跨域设置
var cors = require('cors')
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(__dirname + '/public/images/lh.ico'));报错了，不知为何，以后再看
app.use('/', indexRouter);
app.use('/task', task);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/*--------------------------------------------*/
/*------------socket部分代码--------------*/
//连接数据库
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    path: '/socket'
});

server.listen(3002);
// WARNING: app.listen(80) will NOT work here!


io.on('connection', function(socket) {

    console.log('a user connected')
    io.emit('login', { msg: '一个位用户已登录', content: 1 })


    // to one room
    // socket.to('others').emit('an event', { some: 'data' });

    //监听发送的消息
    socket.on('mes', function(data) {
        if (data.editor) {
            io.emit('update', { msg: 'server发的最新内容', content: data.editor })
        }
    })

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });
});



/*------------socket部分代码--------------*/
/*--------------------------------------------*/
module.exports = app;