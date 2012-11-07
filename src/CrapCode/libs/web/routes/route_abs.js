function route(defaultQuery,com){
    if (defaultQuery && com){
        this.init(defaultQuery,com);
    }
};
route.prototype.init=function(defaultQuery,com){
    this.defaultQuery=defaultQuery;
    this.com=require("../../com"+com);
}
route.prototype.route=function(query,data,cb){
    try{
        if (typeof cb =="undefined" && typeof data =="function"){
            cb=data;
            data=undefined;
        }
        query['_postData']=data;
        this.query=query;
        this.dispatch(cb);    
    }catch(e){
        cb(e.stack);
    }
    
}
route.prototype.dispatch=function(cb){
    var param={};
    for (var key in this.defaultQuery){
            param[key]=this.defaultQuery[key];
    }
    for (var key in this.query){
        param[key]=this.query[key];
    }
    this.com(param,function(err,res,status,headers){
        if (err){
            cb (err);
        }else{
            var resData=res;
            if (typeof res =="object"){
                resData=JSON.stringify(res);
            }
            if (typeof status == "undefined"){
                status=200;
            }
            cb(null,resData,status,headers);
        }
    });
}

module.exports=route;