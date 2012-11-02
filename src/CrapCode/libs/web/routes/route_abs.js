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
        cb(e);
    }
    
}
route.prototype.dispatch=function(cb){
    var param={};
    for (var key in this.defaultQuery){
        if ("undefined" != typeof this.query[key] ){
            param[key]=this.query[key];
        }else{
            param[key]=this.defaultQuery[key];
        }
    }
    this.com(param,cb);
}

module.exports=route;