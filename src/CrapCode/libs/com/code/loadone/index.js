var codeCol=require("../../../jpa").cols.code;


function loadOne(param,cb){
    var hash=param.hash;
    codeCol.readByCol({hash:hash},cb);
}

module.exports=loadOne;