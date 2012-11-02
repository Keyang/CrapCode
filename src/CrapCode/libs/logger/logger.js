var winston=require ("winston");
var logDir="/var/log/crapcode";

winston.add(winston.transports.File,{filename:logDir+"/crapcode.log",json:false});
module.exports=winston;