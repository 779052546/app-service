/**
 * Created by 123 on 2017/7/18.
 */
var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

/* GET users listing. */
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
