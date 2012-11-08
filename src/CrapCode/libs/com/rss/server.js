var RSS = require('rss');
var emitter=require("../../events");
var codeCol=require("../../jpa").cols.code;
var rssXml=null;
var lastItemDate=null;
var logger=require ("../../logger");

function update(cb){
    logger.info("Start to publish RSS");
    codeCol.listActive(0,0,function(err,res){
        if (err){
            logger.error("ERror happend");
            logger.error(err);

            if (cb){
            cb(false);
        }
        }else{
            var latestItem=res[0];
            if (latestItem.submitDateTime == lastItemDate){
                logger.info("No new feed.");
               if (cb){
                cb(true);
            }
            }else{
                logger.info("New feeds available. Re-publish RSS Xml");
                lastItemDate=latestItem.submitDateTime;
                var feed = new RSS({
                    title: 'Latest Crap Code',
                    description: 'The code frustrating you and me.',
                    feed_url: 'http://fdsa.cc/api/rss',
                    site_url: 'http://fdsa.cc',
                    author: 'Keyang Xiang'
                });
                for (var i=0;i<res.length;i++){
                    var item=res[i];
                    feed.item({
                        "title":"Crap Code",
                        "description":item.codeRaw.replace(/&lt;/g,"<").replace(/&gt;/g,">"),
                        "url":"http://fdsa.cc/content#"+item.hash,
                        "guid":item.hash,
                        "author":item.author,
                        'date':item.submitDateTime
                    });
                }
                rssXml=feed.xml();
                logger.info("RSS feeds updated successfully.");
                if (cb){
                    cb(true);
                }
            }
        }
    });
}
function getRSS(){
    return rssXml;
}

emitter.on("ready",function(){
    update();
});
module.exports={
    update:update,
    getRSS:getRSS
}


