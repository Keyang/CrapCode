//all cron jobs

var CronJob=require("cron").CronJob;

var rss_run=new CronJob("0 */10 * * * *",require("../com/rss").loadRss);
var rss_publiser_run=new CronJob ("0 */10 * * * *", require("../com/rss").refreshRSS);

module.exports={
    "rss reaper":rss_run,
    "rss publisher":rss_publiser_run
}