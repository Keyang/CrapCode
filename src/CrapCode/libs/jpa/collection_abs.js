var ObjectID = require('mongodb').ObjectID;
var db=require("./db.js");
function DBCollection(){
    this.init.apply(this,arguments);
}
DBCollection.prototype.init=function(name,dbo){
    this.name=name;
    if (dbo==undefined){
        dbo=db;
    }
    this.db=dbo;
    var that=this;
    this.db.collection(name,function(err,collection){
        that.collection=collection;
    });
}

DBCollection.prototype.insert=function(data,cb){
    if (this.collection){
        this.collection.insert(data,{safe:true},cb);
    }else{
        cb("Collection is not ready to insert.");
    }
}

DBCollection.prototype.update=function(data,cb){
    if (this.collection){
        var _id=data._id;
        var objectId=new ObjectID(_id);
        this.collection.update({_id:objectId},{$set:data},{safe:true,multi:true},cb);
    }else{
        cb("Collection is not ready to update.");
    }
}

DBCollection.prototype.read=function(id,cb){
    var objectId=new ObjectID(id);
    this.readByCol({"_id":objectId},cb);
}

DBCollection.prototype.readByCol=function(condition,cb){
    if (this.collection){
        this.collection.findOne(condition,cb);
    }else{
        cb("Collection is not ready.");
    }
}
module.exports=DBCollection;