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
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 1`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/plimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 6`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/ydhwimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 2`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/sljzimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 7`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/ycssimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 4`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/zlimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 5`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/jdimg',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewtype t  
    LEFT JOIN viewspots v on t.id = v.viewtypeid
    LEFT JOIN ticket k on k.id = v.id
    where t.id = 3`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/search',function(req,res){
    conn.query(`select v.name,v.img,v.desc,k.name cname,k.price,v.identification i from viewspots v  
    LEFT JOIN ticket k on k.id = v.id`,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
})

module.exports = router;
