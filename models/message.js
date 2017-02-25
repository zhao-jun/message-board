var mongoose = require('mongoose');
var moment = require('moment');

//数据库模型
var messageSchema = mongoose.Schema({
    id:Number,
    name:String,
    text:String,
    date:String
    // {type:Date,required: true, default: new Date()}
});

//暂无中间件

// 添加 mongoose 静态方法，静态方法在Model层就能使用
messageSchema.statics.findAll = function(cb) {
    return this.find({})
                .sort({'id':-1})
                .exec(cb);
};

//创建
//数据库中的集合名称,当我们对其添加数据时如果Message已经存在，则会保存到其目录下，如果未存在，则会创建Message集合，然后在保存数据。
//集合默认会添加s
var MessageModel = mongoose.model('Messages',messageSchema);

module.exports = MessageModel;

/*
 *	-- Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库操作能力
 *	-- Model : 由Schema发布生成的模型，具有抽象属性和行为的数据库操作
 *	-- Entity: 有Model创建的实体，它的操作也会影响数据库
 */
