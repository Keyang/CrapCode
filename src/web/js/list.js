var currentIndex=null;
crapCode.currentIndex=0;
crapCode.order="submitDateTime";
crapCode.on("ready",function(){
    var that=this;
     this.template("listItem",function(){
        that.loadList(0,crapCode.order);
     });
     $("#loadMore").click(function(){
        $(this).hide();
        $("#loadingList").show();
        crapCode.currentIndex+=10;
        that.loadList(crapCode.currentIndex,crapCode.order,function(resArr){
            if (resArr.length>0){
                $("#loadingList").hide();
                $("#loadMore").show();
            }else{
                $("#loadingList").text("木有了...");
            }
            
        });
     });
    
});

crapCode.loadList=function(skip,order,cb){
       $.get("/api/list?skip="+skip,function(resArr){
        for (var i=0;i<resArr.length;i++){
            var res=resArr[i];
            var type=res.codeType?res.codeType.toLowerCase():"text";
            var data={
                dt:new Date(res.submitDateTime),
                author:res.author?res.author : "匿名",
                type:type.toUpperCase(),
                likenum:res.like,
                code:res.codeRaw,
                codetype:type
            }
            var itemHtml=tmpl("listItemTemplate",data);
            $("#list").append(itemHtml);
            }
          SyntaxHighlighter.highlight();        
          if (cb){
            cb(resArr);
          }
        
    });  
}