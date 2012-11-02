var mongodb=require("mongodb");
var Server=mongodb.Server;
var server=new Server("localhost",27017,{auto_reconnect: true});

var db=new mongodb.Db("CrapCode",server);
var logger=require ("../logger");

db.open(function (err,db){
    logger.log("Database connected!");
});

module.exports=db;