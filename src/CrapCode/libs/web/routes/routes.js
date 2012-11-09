var Route=require("./route_abs");

function createRoute(defaultQuery,com){
    function route(){
        routeObj.route.apply(routeObj,arguments);
    }
    var routeObj=new Route(defaultQuery,com);
    return route;
}

var route_index=createRoute({
    "skip":0,
    "order":"latest"
},"/code/list");
var route_uploadcode=createRoute({
},"/code/upload");

var route_rss=createRoute({},function(param,cb){
    var rssFeeds=require("../../com/rss").getRSS();
    cb(null,rssFeeds,200,{
        "Content-Type":"application/rss+xml; charset=utf-8"
    });
});

var route_one=createRoute({
    "hash":null
},"/code/loadone");

var routes={
    "get":{
        "/list":route_index,
        "/rss":route_rss,
        "/one":route_one
    },
    "post":{
        "/uploadcode":route_uploadcode
    }
}

module.exports=routes;