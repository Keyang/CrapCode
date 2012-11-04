crapCode.on("ready",function(){
    $.get("/api/list",function(resArr){
        for (var i=0;i<resArr.length;i++){
            var res=resArr[i];
            var data={
                dt:new Date(res.submitDateTime),
                author:res.author?res.author : "匿名",
                type:res.codeType?res.codeType.toUpperCase() : "TEXT",
                likenum:res.like,
                code:res.codeRaw,
                codetype:res.codeType
            }
            var itemHtml=tmpl("listItemTemplate",data);
            $("#list").append(itemHtml);
        }
        SyntaxHighlighter.highlight();    
        
    });
});