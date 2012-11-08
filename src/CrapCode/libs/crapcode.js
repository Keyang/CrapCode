var cronServer=require("./jobs");
var webServer=require("./web");
var logger=require("./logger");
var emitter=require("./events");
var checkTick={
    "db":false,
    "webserver":false,
    "cron":false
}
function check(){
    for (var key in checkTick){
        if (checkTick[key] ===false){
            return;
        }
    }
    logger.info("#####CrapCode Server started#####");
    emitter.emit("ready");
}
emitter.on("dbready",function(){
    checkTick['db']=true;
    check();
});
emitter.on("webserverready",function(){
    checkTick['webserver']=true;
    check();
});

emitter.on("cronready",function(){
    checkTick['cron']=true;
    check();
});


logger.info("#####Start to initialise CrapCode Server#####");
webServer.startServer();
cronServer.startAll();


