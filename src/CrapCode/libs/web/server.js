/**
 *A light-weight web layer for code crap backend. Only need to return JSON.
 * 
 */
var http=require("http");
var server=null;
var logger=require ("../logger");
var routes=require("./routes");
function startServer(){
    if (server === null){
        server=http.createServer();
        server.on("request",function(req,res){
            var time1=new Date();
            routes.dispatch(req,res,function(err){
                var time2=new Date();
                logRequest(req,res,time2-time1);
            });
            
        });
        server.listen(3000);
        logger.info("Server started at port 3000");
    }
    
}

function stopServer(cb){
    if (server != null){
        server.close(function(){
            server=null;    
            if (cb){
                cb();
            }
        });
    }
}
function logRequest(req,res,time){
    var method=req.method;
    var url=req.url;
    var statusCode=res.statusCode;
    var ip=req.connection.address().address;
    var logTmp="{method} {url} from {ip}  {statusCode} {time}ms"

    logger.log("info", logTmp.replace("{method}",method)
        .replace("{url}",url)
        .replace("{statusCode}",statusCode)
        .replace("{time}",time)
        .replace("{ip}",ip)
    );
}

module.exports={
    startServer:startServer,
    stopServer:stopServer
}