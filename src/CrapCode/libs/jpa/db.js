var mongodb=require("mongodb");
var Server=mongodb.Server;
var server=new Server("localhost",27017,{auto_reconnect: true});
var logger=require("../logger");
var db=new mongodb.Db("CrapCode",server,{"safe":false});
var logger=require ("../logger");

function dbConnect(){
    db.open(function (err,db){
        if (!err){
            logger.info("Database connected!");    
        }else{
            logger.error("Database Connection Failed. Try again in 5 seconds...");
            logger.error(err);
            setTimeout(dbConnect,5000);
        }
        
    });
}


module.exports=db;