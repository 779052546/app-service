var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,callback) {
        // 上传目录，地址相对于项目根
        callback(null,'./public/images')
    },
    filename:function(req,file,callback){
        var timeStamp = Date.now();
        var extName = file.originalname.split('.')[file.originalname.split('.').length-1];
        callback(null,timeStamp+'.'+extName);
    }
});
var upload = multer({storage}).single('file');

/* 上传文件处理 */
router.post('/', function (req, res, next) {
    upload(req,res,function(err){
        if (err) {
            // res.status(500);
            return res.json( {
                "success": false,
                "msg": err
            });
        }
        // 上传成功，返回文件名
        console.log(req.file);
        res.json( {
            "success": true,
            "file_path": "http://localhost:3000/images/"+req.file.filename
        });
    })
});

module.exports = router;