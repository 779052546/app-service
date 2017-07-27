var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

//在此处定义全局变量,来获取每一次提交景区信息后,自增的id
var viewidSQL;
//景区信息插入
router.post('/viewspots',function(req,res) {
    console.log(req.body);
    var sql1 = `INSERT INTO viewspots SET ?`;
    conn.query(sql1, req.body, function (err, result) {
        console.log('result:',result);
        viewidSQL = result.insertId;
        console.log('')
        if (err) {
            return res.send({success: false, data: err.message});
        }
        if (result.affectedRows > 0) {
            return res.json({success: true,viewid:result.insertId});
        }
        return res.json({success:false,data:"插入失败!"});

    });
});
//状态表信息插入
router.post('/status',function(req,res) {
    console.log(req.body);
    var sql2 = `INSERT INTO status SET ?`;
    conn.query(sql2,req.body,function (err,result) {
        if(err)
        {
            return res.send({success:false,data:err.message});
        }
        if (result.affectedRows > 0)
        {
            return res.json({success:true});
        }
        return res.json({success:false,data:"插入失败!"});
    });
});

//票价表信息插入,由于此表每次插入的信息条数都不固定,此处需要一个循环插入的方法来实现
//使用循环插入的方法,每一次提交的回调结果会重复执行,所以此处调用promise方法,将异步执行的结果封装到一起

router.post('/ticket',function(req,res) {
    var queries = [];
    var sql = 'insert into ticket set ?';

    for (var i = 0; i < req.body.length; i++){
        var promise = new Promise(function(resolve, reject){
            var t = req.body[i];
            t.viewid = viewidSQL;
            console.log('t',t);
            conn.query(sql,t,function (err,result) {
                if(result && result.affectedRows > 0)
                {
                    resolve(true);
                }
                else
                {
                    reject('操作失败');
                    console.log(err);
                }
            });
        });
        queries.push(promise);
    }
    Promise.all(queries)
        .then(function (success) {
            res.json({success});
        }).catch(function (err) {
        res.json({success:false,err});
    })
});

//前端购物车页面get请求处理
router.get('/contactget',function (req,res) {
    var sql = `SELECT viewspots.name,ticket.name tname,ticket.price,carshop.amount,carshop.id,viewspots.img FROM viewspots 
               LEFT JOIN carshop ON viewspots.id = carshop.viewspotsid
               RIGHT JOIN ticket ON ticket.id = carshop.ticketid
               WHERE carshop.usersid = 3`;
    conn.query(sql,function (err,result) {
        if (err){
            return res.send({success:false,data:err.message});
        }
        return res.send({success:true,data:result});
    })
});

//前端购物车处理put请求
router.put('/contactput',function (req,res) {
    //console.log(req.body);
    var sql = `UPDATE carshop SET amount = ? WHERE id = ?`;
    conn.query(sql,[req.body.amount,req.body.id],function (err,result) {
        console.log(result);
        if (err){
            return res.send({success:false,data:err.message});
        }
        if (result.affectedRows > 0){
            return res.json({success:true});
        }
    })
})

//前端购物车的delete请求处理
router.delete('/contactdel/:id',function (req,res) {
    //console.log(req.params.id);
    var sql = `delete from carshop where id = ?`;
    conn.query(sql,[req.params.id],function (err,result) {
        if (err){
            return res.send({success:false,data:err.message});
        }
        res.send({success:true});
    })
})
module.exports = router;
