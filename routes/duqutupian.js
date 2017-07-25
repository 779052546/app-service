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
router.get('/hot/:pageNum',function(req,res){
    var size = req.params.pageNum * 1;
    conn.query(`select * from tuijian limit ?`,[size],function(err,results){
        if (!err){
            res.send({data:results});
        }
    })
});
// var sql = `select v.name,v.img,v.desc,k.name cname,k.price,v.identification i,v.date,v.id from viewspots v
//     LEFT JOIN viewtype t on t.id = v.viewtypeid
//     LEFT JOIN ticket k on k.viewid = v.id
//     where v.viewtypeid = `;
var sql = `select v.name,v.img,v.desc,v.identification i,v.date,v.id from viewspots v  
    LEFT JOIN viewtype t on t.id = v.viewtypeid 
    where v.viewtypeid = `

router.get('/hotimg',function(req,res){
    conn.query(sql + 1,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/plimg',function(req,res){
    conn.query(sql+6,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/ydhwimg',function(req,res){
    conn.query(sql+2,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/sljzimg',function(req,res){
    conn.query(sql+7,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/ycssimg',function(req,res){
    conn.query(sql+4,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/zlimg',function(req,res){
    conn.query(sql+5,function(err,results){
        if(!err){
            res.send({data:results});
        }
    })
});

router.get('/jdimg',function(req,res){
    conn.query(sql+3,function(err,results){
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
});


router.get('/searchId/:id',function(req,res){
    //console.log(req.params.id);
    conn.query(`select * from ticket where viewid = ?`,[req.params.id],function(err,result){
        if(!err){
            res.send({data:result});
        }
    })
})

router.get('/minprice/:id',function(req,res){
    conn.query(`SELECT v.name,v.img,v.desc,v.identification i,v.date,v.id,MIN(k.price) minprice,MAX(k.price) maxprice FROM  ticket k  
    LEFT JOIN viewspots v ON v.id = k.viewid 
    WHERE k.viewid = ?`,[req.params.id],function(err,result){
        if(!err){
            res.send({data:result});
        }
    })
})

router.get('/statusId/:id',function(req,res){
    console.log(req.params.id);
    conn.query(`select * from status where id = ?`,[req.params.id],function(err,result){
        if(!err){
            res.send({data:result});
        }
    })
})

module.exports = router;
