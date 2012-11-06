var parser=require("feedparser");
var rss_url="http://codecrap.com/content/feed/";
var codeCol=require("../../jpa").cols.code;
var logger=require("../../logger");


function run(){
    logger.info("Start to parse RSS:"+rss_url);
    parser.parseUrl(rss_url).on("article",function(article){
        var title=article.title;
        //this may disrupt the code which has <pre> </pre>
        var codeRaw=article.description.replace(/<pre>/g,"").replace(/<\/pre>/g,"");
        var submitDate=new Date(article.pubDate);
        logger.info("Store:"+title);
        codeCol.addCode(codeRaw,undefined,submitDate,function(err,res){
            if (err){
                logger.error(err);
            }
            logger.info("Stored: "+title);
        });
    });
}
module.exports=run;
