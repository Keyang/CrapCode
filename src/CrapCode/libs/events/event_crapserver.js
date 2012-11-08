var EventEmitter=require("events").EventEmitter;
var emitter=new EventEmitter(); //server-scope event emitter.

module.exports=emitter;