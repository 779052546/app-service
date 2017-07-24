/**
 * Created by 123 on 2017/7/24.
 */
var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.query.pageNum);
    var size = 3;
    var fromIndex = (req.query.pageNum-1) * size;
    //1起始索引
    //2每页条数
    var sql = `SELECT * FROM viewspots LIMIT ?,?`;
    conn.query(sql,[fromIndex,size],function(err,results){
        if(err){
            console.log(err);
        }
        conn.query('SELECT COUNT(*) AS num_count FROM viewspots',function(err,result){
            res.send({data:{total:result[0].num_count,jieguo:results}})
        })
    })
});

router.delete('/:id',function(req,res){
    var sql = `DELETE FROM viewspots WHERE id = ?`;
    conn.query(sql,[req.params.id],function(err,results){
        if (!err){
            res.send({success:true});
        }
    })
});

router.put('/',function(req,res){
    var sql = `update viewspots set ? where id = ?`;
    conn.query(sql,[req.body,req.body.id],function(err,result){
        if(err){
            res.json({success:fasle,data:err.message})
        }
        res.json({success:true});
    })
})

module.exports = router;
