
crapCode.loadOne=function(id,cb){
  $.get("/api/one?hash="+id,function(res){
        if (cb){
            cb(res);
        }
  });
}

crapCode.on("ready",function(){
  if (window.location.toString().indexOf("/content")>0){
     $("#loadMore").remove(); //hacky way. 
      var that=this;
      var url=window.location.toString();
      var hash=url.substr(url.indexOf("#")+1);
     this.template("listItem",function(){
        that.loadOne(hash,function(res){
            if (res){
                 var type=res.codeType?res.codeType.toLowerCase():"text";
                 var data={
                    dt:new Date(res.submitDateTime),
                    author:res.author?res.author : "匿名",
                    type:type.toUpperCase(),
                    likenum:res.like,
                    code:res.codeRaw,
                    codetype:type,
                    hash:res.hash
                }
                var itemHtml=tmpl("listItemTemplate",data);
                $("#list").append(itemHtml);
                SyntaxHighlighter.highlight();  
            }else{

            }
        });

     });
  }
});