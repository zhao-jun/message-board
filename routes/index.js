var express = require('express');
var router = express.Router();
var MessageModel = require('../models/message');

//定义主页路由
router.get('/',function (req, res) {
    //Renders a view and sends the rendered HTML string to the client
    MessageModel.findAll(function (err,messages) {
        if (err) {
            console.log(err);
        }
        // console.log(messages);
        res.render('index',{title:'message board',messages:messages})
    })
});

module.exports = router;