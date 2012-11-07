var codeCol=require("../../../jpa").cols.code;
var url=require("url");
var allowedCodeType={
    "plain":1,
    "as3":1,
    "bash":1,
    "cf":1,
    "c-sharp":1,
    "cpp":1,
    "css":1,
    "delphi":1,
    "diff":1,
    "erl":1,
    "groovy":1,
    "js":1,
    "java":1,
    "jfx":1,
    "perl":1,
    "php":1,
    "ps":1,
    "py":1,
    "rails":1,
    "scala":1,
    "sql":1,
    "vb":1,
    "xml":1
}

/**
 * 
 * Store uploaded code
 * @param  {[type]}   param {codeLanugage:string, codeRaw:string}
 * @param  {Function} cb    [description]
 * @return  callback {success:true/false,errMsg:str}
 */
function uploadCode(param,cb){
    var postData=param['_postData'];
    var param=url.parse("?"+postData,true).query;
    var codeType=param.codeLanguage;
    var codeRaw=param.codeRaw;
    if (allowedCodeType[codeType] ==1){
        codeCol.addCode(codeRaw,codeType,new Date(),function(err,res){
            if (err){
                cb(err,null);
            }else{
                cb(null,{"success":true});
            }
        });
    }else{
        return cb(null,{"success":false,errMsg:"Cannot find code language: "+codeType});
    }
}
module.exports=uploadCode;