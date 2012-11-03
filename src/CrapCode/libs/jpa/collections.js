var Collection =require("./collection_abs.js");
function getCollection(name){
    var obj=new Collection(name);
    return obj;
}

var rss_source=getCollection("rss_source");



module.exports={
    "code":require ("./collection_code.js"),
    "rssSource":rss_source
}