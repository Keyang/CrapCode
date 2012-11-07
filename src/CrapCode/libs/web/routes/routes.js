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


var routes={
    "get":{
        "/list":route_index
    },
    "post":{
        "/uploadcode":route_uploadcode
    }
}

module.exports=routes;