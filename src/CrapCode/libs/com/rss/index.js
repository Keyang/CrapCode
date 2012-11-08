var rssServer=require("./server");
module.exports={
    loadRss:function(){
        var rssFeeds=[require("./rss_codecrap")];
        for (var i=0;i<rssFeeds.length;i++){
            rssFeeds[i]();
        }
    },
    refreshRSS:rssServer.update,
    getRSS:rssServer.getRSS
}
