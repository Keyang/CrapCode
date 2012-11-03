var parser=require("feedparser");
var rss_url="http://codecrap.com/content/feed/";
var codeCol=require("../../jpa").cols.code;
var logger=require("../../logger");


function run(){
    logger.info("Start to parse RSS:"+rss_url);
    parser.parseUrl(rss_url).on("article",function(article){
        var title=article.title;
        var codeRaw=article.description;
        var submitDate=new Date(article.pubDate);
        logger.info("Store:"+title);
        codeCol.isExisted(codeRaw,function(err,res){
            if (err){
                logger.error(err);
            }else{
                if (res){
                    logger.info("Duplicated entry. Skip it.");
                }else{
                    codeCol.addCode(codeRaw,undefined,submitDate,function(err,res){
                        if (err){
                            logger.error(err);
                        }
                        logger.info("Stored: "+title);
                    });
                }
            }
        });
    });
}
module.exports=run;