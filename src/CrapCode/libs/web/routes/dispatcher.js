var routes=require("./routes");
var logger=require ("../../logger");
var url=require("url");

function parseUrl(curUrl){
    return url.parse(curUrl,true);
}
module.exports=function(req,res,cb){
    var method=req.method.toLowerCase();
    var urlObj=parseUrl(req.url);
    var url=urlObj.pathname.toLowerCase();
    var query=urlObj.query;

    if (!routes[method]){
        logger.warn("Undefined Method: "+method);
        res.statusCode=400;
        res.end("Undefined Method:"+method);
        cb(null);
    }else if (!routes[method][url]){
        logger.warn("Undefined route: "+url);
        res.statusCode=404;
        res.end("Page not found." + url);
        cb(null);
    }else{
        var route=routes[method][url];
        req.on("close",function(){
            res.statusCode=0;
            res.end();
           // cb("Connection Closed");
           cb(null);
        });
        function _routeCallback(err,resData,statusCode,headers){
            if (err){
                logger.error(err);
                res.statusCode=500;
                res.setHeader("Content-Type","text/html");
                res.end("<h1>500 Internal Error</h1>"+"<pre>"+err+"</pre>");
                cb(err);
            }else{
                statusCode=statusCode?statusCode:200;
                if (headers ==undefined){
                    headers={};
                }
                headers['Content-Type']=headers['Content-Type']?headers['Content-Type']:"application/json; charset=utf-8";
                headers['X-Powered-By']="CrapCode Script";
                headers['Server']="Crap Server";
                res.writeHead(statusCode,headers);
                res.write(resData);
                res.end();
                cb(null);
            }
        }
        if (method == "post"){
            req.setEncoding('utf8');
            var data="";
            req.on("data",function(chunk){
                data+=chunk;
            }) ;
            req.on("end",function(){
                route(query,data,_routeCallback);
            }) ;
        }else{
            route(query,_routeCallback);
        }
    }

}