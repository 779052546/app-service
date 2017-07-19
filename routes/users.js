var express = require('express');
var router = express.Router();
var conn = require('../mysql/db').getConn();

/* GET users listing. */
router.get('/', function(req, res) {

});

module.exports = router;
