crapCode.on("ready",function(){
    $.get("/api/list",function(resArr){
        var templateList=[];
        var typeLoaded={};
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
            if (!typeLoaded[type]){
                templateList.push(brushes[type]);
                typeLoaded[type]=true;
            }
            var itemHtml=tmpl("listItemTemplate",data);
            $("#list").append(itemHtml);
        }
        loadTemplate(templateList,function(){
            SyntaxHighlighter.highlight();        
        });
        
        
    });
});