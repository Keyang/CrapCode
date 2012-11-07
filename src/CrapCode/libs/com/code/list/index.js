var codeCol=require("../../../jpa").cols.code;


function getItemList(param,cb){
    var skip=parseInt(param.skip); //very important hack for mongo native driver..shitty bug.wasted 1 hour here.
    var order=param.order;
    codeCol.listActive(skip,order,cb);
}

module.exports=getItemList;