var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('4444444444444444444444444');
  let sql = `SELECT * FROM viewspots`;
  conn.query(sql,function(err,results){
    if(!err){
      res.send({data:results});
    }
  })
});

module.exports = router;
