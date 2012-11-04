crapCode={};
crapCode.app={
    init:function(){
       $(function(){
            crapCode.template("listItem",function(){
                crapCode.emit("ready");
            });
        }); 
   }

}
crapCode.template=function(name,cb){
    $.get("./template/"+name+".html",function(res,success,xhr){
        var htmlCode=xhr.responseText;
        $("body").append(htmlCode);
        if (cb){
            cb();
        }
    });
}

crapCode.events={};
crapCode.on=function(event,cb){
    if (!crapCode.events[event]){
        crapCode.events[event]=[];
    }
    crapCode.events[event].push(cb);
}

crapCode.emit=function(event,args){
    if (crapCode.events[event]){
        for (var i=0;i<crapCode.events[event].length;i++){
            var func=crapCode.events[event][i];
            if (args === undefined){
                args=[];
            }
            func.apply(crapCode,args);
        }
    }   
}
crapCode.app.init();