var cronServer=require("./jobs");
var webServer=require("./web");
var logger=require("./logger");
logger.info("CrapCode Server start to initialise...");
webServer.startServer();
cronServer.startAll();
logger.info("CrapCode Server started");

