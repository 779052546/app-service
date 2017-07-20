/**
 * Created by 123 on 2017/7/20.
 */
var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

/* GET users listing. */
router.get('/', function(req, res) {
    conn.query(`select * from images`,function(err,results){
        if (!err){
            res.send({data:results});
        }
    })
});
router.get('/hot',function(req,res){
    conn.query(`select * from tuijian`,function(err,results){
        if (!err){
            res.send({data:results});
        }
    })
});

router.get('/hotimg',function(req,res){
    conn.query(`select * from viewtype where thehot = ?`,1,function(err,results){
        let hotid = results.id;
        if(!err){
            res.send(results);
        }
    })
})

module.exports = router;
