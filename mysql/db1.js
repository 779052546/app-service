var mysql = require('mysql');
var config = {
    host:'10.0.44.230',
    user:'杨睿',
    password:'123456',
    database:'weekend-tour',
    port:3306
};

module.exports= {
    getConn:function(){
        var conn = mysql.createConnection(config);
        conn.connect(function(err){
            if(!err){
                console.log('连接数据库成功');
            }
        });
        return conn;
    }
}
