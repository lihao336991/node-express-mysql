var express = require('express');
var mysql = require('../common/basicConnection');
var DBSQL = require('../model/DBSQL')
var router = express.Router();
var qibu_task = new DBSQL('qibu_task', ['id', 'task', 'name', 'created_at'])
    // 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
/* GET users listing. */
router.get('/', function(req, res, next) {
    let selectSql = '';
    if (req.query.id) {
        selectSql = qibu_task.select('id', req.query.id)
    } else {
        selectSql = qibu_task.list
    }
    mysql.query(selectSql, function(err, result) {
        if (result) {
            res.json({
                code: '200',
                data: result
            })
        } else {
            res.json({
                code: '500',
                msg: err
            })
        }
        // responseJSON(res, result)
    })
});

router.post('/', function(req, res, next) {
    let mysqlSQL = ''
    console.log(req.body, '传的参数')
    if ('_methods' in req.body) { //判断参数里有无_methods字段，区分post与delete/put方法
        if (req.body._methods == 'put') { //修改方法
            mysqlSQL = qibu_task.update('id', req.body)
            console.log(mysqlSQL)
        } else if (req.body._methods == 'delete') { //删除方法
            mysqlSQL = qibu_task.delete('id', req.body.id)
        }
    } else { //post提交方法
        let testmsg = qibu_task.insert(req.body)
        mysqlSQL = testmsg
        console.log('走的提交方法')
    }
    mysql.query(mysqlSQL, function(err, result) {
        if (result) {
            res.json({
                code: '200',
                data: result
            })
        } else {
            res.json({
                code: '500',
                msg: err
            })
        }
    })
})
module.exports = router;