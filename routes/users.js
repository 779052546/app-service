var express = require('express');
var router = express.Router();
var conn = require('../mysql/db1').getConn();


router.get('/',(req, res)=>{
    var sql = `SELECT * FROM users`;
    conn.query(sql,function(err,results){
        console.log(results);
        if (err) {
            return res.send({
                success: false,
                data: '用户信息查询失败'
            })
        }
        conn.query('SELECT COUNT(*) AS num_count FROM users',function(err,result){
            return res.send({
                success: true,
                data: results,
                total:result[0].num_count
            })
        })
    })
});


router.put('/',(req,res)=>{
      console.log(req.body);
      var sql = `UPDATE users SET password =  ? WHERE id= ?`;
      conn.query(sql,[req.body.password,req.body.id],(err,result)=>{
        if(!err && result.affectedRows>0){
          return res.json({success:true,data:result.insertId});
        }else{
            res.json({success:false,data:'修改密码失败'});
        }
      })
});

router.delete('/:id',(req,res)=>{
    var sql = `DELETE FROM users WHERE id=?`;
    conn.query(sql,[req.params.id],(err,r)=>{
          if(err){
            return res.send({
                success:false,
                data:'删除用户信息失败'
            });
          }
          console.log(r);
          if(!err){
              res.send({success:true});
          }

    })
});

module.exports = router;
