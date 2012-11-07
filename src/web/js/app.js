crapCode={};
crapCode.app={
    init:function(){
       $(function(){
            crapCode.emit("ready",arguments);
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
crapCode.on=function(event,cb){ //event subscriber
    if (!crapCode.events[event]){
        crapCode.events[event]=[];
    }
    crapCode.events[event].push(cb);
}

crapCode.emit=function(event,args){ //event emitter
    if (crapCode.events[event]){
        for (var i=0;i<crapCode.events[event].length;i++){
            var func=crapCode.events[event][i];
            if (args === undefined){
                args=[];
            }
            try{
                func.apply(crapCode,args);    
            }catch(e){
                console.log(e);
            }
            
        }
    }   
}
crapCode.dlg=function(dlgName,isOpen,onClose){ //open/close a dialog
        var animLen=300;
        var isCancel=false;
        if (isOpen){
            $(".modal_bg").show();
            var obj= $("#"+dlgName);
            obj.css("top","-"+obj.css("height"));
            obj.show();
            obj.animate({
                top:0
            },animLen);
            var that=this;
            $("#"+dlgName+" .dlg_cancel").click(function(){
                isCancel=true;
                that.dlg(dlgName,false,onClose);

            });
        }else{
            $("#"+dlgName).animate({
                top:-$("#"+dlgName).height()
            },animLen,function(){
                $(".modal_bg").hide();
                $("#"+dlgName).hide();
                if (onClose){
                    onClose(isCancel);
                }
            });
        }
}
crapCode.app.init();