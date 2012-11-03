//all cron jobs

var CronJob=require("cron").CronJob;

var rss_run=new CronJob("0 */10 * * * *",require("../com/rss").loadRss);

module.exports={
    "rss":rss_run
}