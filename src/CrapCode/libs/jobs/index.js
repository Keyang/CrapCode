var crons=require("./crons");
var logger=require("../logger");
function startAll(){
    for (var key in crons){
        logger.info("Start Cron:"+key);
        crons[key].start();
    }
}
function stopAll(){
    for (var key in crons) {
        logger.info("Stop Cron:"+key);
        crons[key].stop();
    }   
}

module.exports={
    startAll:startAll,
    stopAll:stopAll
}