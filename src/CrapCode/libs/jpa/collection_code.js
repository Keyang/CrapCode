var Collection =require("./collection_abs.js");
var name="code"; //collection name
var crypto = require('crypto');


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
    var sortField="submitDateTime";
    if (order == "best"){
        sortField="like";
    }
    var res=this.collection.find(conditions).skip(skip).limit(10).sort([sortField,"desc"]);
    res.toArray(cb);
}
CodeCollection.prototype.listActive=function(skip,order,cb){
    var condition={
        "status":1
    }
    this.list(skip,order,condition,cb);
}
CodeCollection.prototype.addCode=function(codeRaw,codeType,submitDateTime,cb){
    var data={};
    data.createDate=new Date();
    data.status=0;
    data.like=0;
    if (submitDateTime === undefined){
        data.submitDateTime=new Date();
    }
    if (codeType === undefined){
        codeType="NONE"
    }
    var escapedCodeRaw=codeRaw.replace(/</g,"&lt;").replace(/>/g,"&gt;");
    data.codeRaw=escapedCodeRaw;
    var hashmd5=crypto.createHash('md5');
    hashmd5.update(codeRaw);
    data.hash=hashmd5.digest("hex");
    data.author=null;
    data.comment=[];
    this.insert(data,cb);
}
CodeCollection.prototype.isExisted=function(codeRaw,cb){
    var hashmd5=crypto.createHash('md5');
    hashmd5.update(codeRaw);
    var codeHash=hashmd5.digest("hex");
    this.readByCol({"hash":codeHash},function(err,res){
        if (err){
            cb(err);
        }else{
            if (!err && res){
                cb (null,true);
            }else{
                cb (null,false);
            }
        }
        
    });
}

module.exports=new CodeCollection;