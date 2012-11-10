var Collection =require("./collection_abs.js");
var name="code"; //collection name
var crypto = require('crypto');
var logger=require("../logger");

// Code Collection definition:
// {
//     "createDate":"when it is created",
//     "codeRaw":"Escaped code stored here",
//     "hash":"identifier --  unique",
//     "codeType":"Enum for code language type",
//     "like":"number of like/dislike",
//     "submitDateTime":"when it is created by author",
//     "author":"currently it is not used",
//     "comments":"comments array",
//     "status":"status of the item 0-- not verified, 1--published, 2--archived, 3 -- Trashed"
// }

var CodeCollection=function(){};
CodeCollection.prototype=new Collection(name);

CodeCollection.prototype.list=function(skip,order,conditions,cb){
    var sortField=[["submitDateTime","desc"]];
    if (order == "best"){
        sortField=[["like","desc"],["submitDateTime","desc"]];
    }
    this.collection.find(conditions).skip(skip).limit(10).sort(sortField).toArray(cb);
}
CodeCollection.prototype.listActive=function(skip,order,cb){
    var condition={
        "status":1
    }
    this.list(skip,order,condition,function(err,res){
        cb(err,res);
    });
}
CodeCollection.prototype.addCode=function(codeRaw,codeType,submitDateTime,cb){
    var hashmd5=crypto.createHash('md5');
    hashmd5.update(codeRaw);
    var hash=hashmd5.digest("hex");
    var that=this;
    this.readByCol({"hash":hash},function(err,res){
        if (err){
            cb(err);
        }else{
            if (res){
                logger.info("Duplicated entry. Skip it. Hash: "+hash);
                cb(null,null);
            }else{
                var data={};
                data.createDate=new Date();
                data.status=0;
                data.like=0;
                if (submitDateTime === undefined){
                    data.submitDateTime=new Date();
                }
                if (codeType === undefined){
                    codeType="text"
                }
                var escapedCodeRaw=codeRaw.replace(/</g,"&lt;").replace(/>/g,"&gt;");
                data.codeRaw=escapedCodeRaw;
                
                data.hash=hash;
                data.author=null;
                data.comment=[];
                data.codeType=codeType.toLowerCase();
                data.submitDateTime=submitDateTime;
                that.insert(data,cb);
            }
        }
    });
   
}



module.exports=new CodeCollection;