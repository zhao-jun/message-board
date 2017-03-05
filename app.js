var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 引入的model，可用来操作数据库和生成Entity
var MessageModel = require('./models/message');

//实例化
var app = express();

//默认端口3000或自己设置set PORT  env environment
var port = process.env.PORT||3000;

// 链接数据库
// Use native promises
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/message');
db.connection.on('connected', function () {
    console.log('Mongoose connection success');
});
db.connection.on('error', function (err) {
    console.log('connection error');
});

//表单提交 数据格式化
//form请求，JSON请求
// the URL-encoded data with the querystring library (when false) or the qs library (when true)
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views','./views');
app.set('view engine','ejs');

// 静态资源请求路径
app.use(express.static('public'));


app.listen(port,function () {
    console.log('listen on port '+ port);
});

//加载路由模块
app.use('/',require('./routes/index'));

//新增留言
app.post('/message',function (req, res) {
/*    if(!req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('text')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }*/
    // console.log(req.body);
    // 实例化新添加的内容
    var newMessage = {
        id:req.body.id,
        name : req.body.name,
        text : req.body.text,
        date : req.body.date
    };
    var messageEntity = new MessageModel(newMessage);
    messageEntity.save(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('save OK!');
            res.json({success:1});
        }
    });
    // res.json(messageEntity);
});


app.delete('/list',function (req, res) {
    var id =req.query.id;
    if(id) {
        MessageModel.remove({id:id},function (error) {
            if(error) {
                console.log(error);
            } else {
                console.log('delete ok!');
                res.json({success:1})
            }
        })
    }
});

app.disable('x-powered-by');
