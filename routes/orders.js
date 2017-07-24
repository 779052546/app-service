/**
 * Created by 123 on 2017/7/18.
 */
var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

// 左联查询 根据下单表中的userid与用户表中的id值相同 ,其次 其表tid中与票价ticket表中的id值 ,最后 viewid与表viewspots中的id
router.get('/', function(req, res) {
    var sql = `SELECT o.id,o.viewid,o.tid,o.time,o.amount,u.name,t.name tname,v.name vname FROM orders o 
    LEFT JOIN users u on o.usersid = u.id
    LEFT JOIN ticket t ON o.tid = t.id
    LEFT JOIN viewspots v ON o.viewid = v.id`;
    conn.query(sql,function(err,results){
        if(err){
            console.log(err);
            throw err
        }
        res.send(results);
    })
});


module.exports = router;
