var codeCol=require("../../../jpa").cols.code;


function getItemList(param,cb){
    var skip=param.skip;
    var order=param.order;
    codeCol.listActive(skip,order,cb);
}

module.exports=getItemList;