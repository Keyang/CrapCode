crapCode.on("ready",function(){
    var that=this;
    $("#btn_upload_code").click(function(){
        that.dlg("uploadCode",true,that.cleanUpload);
    });
    $("#upload_submit").click(function(){
        var language=$("#codeLanguage").val();
        var codeRaw=$("#crapcode").val();
        that.uploadCode(codeRaw,language,function(isSuccess){
            if (isSuccess){
                window.location="/";
            }
        });
    });
    //capture location url.
    var currentLoc=window.location.toString();
    if (currentLoc.indexOf("#uploadCode")>0){
        setTimeout(function(){
            that.dlg("uploadCode",true);
        },100);
    }
});
crapCode.cleanUpload=function(){
    setTimeout(function(){
        $("#codeLanguage").val($("#codeLanguage option:first").val());
        $("#crapcode").val("");
    },1000);
}
crapCode.uploadCode=function(codeRaw,codeLanguage,cb){
    if (codeRaw ==""){
        alert("代码为空，请输入代码。");
        if (cb){
            cb(false);
        }
        return;

    }
    var data={"codeRaw":codeRaw,"codeLanguage":codeLanguage};
    $.ajax({
        type:"POST",
        url:"/api/uploadcode",
        data:data,
        error:function(){
            alert("代码上传失败。请稍候重试...");
            if (cb){
                cb(false);
            }
        },
        success:function(res){
            if (res.success){
                alert("代码上传成功！");
                if (cb){
                    cb(true);
                }
            }else{
                alert("代码上传失败。错误信息："+res.errMsg);
                if (cb){
                    cb(false);
                }
            }
            
        }
    });
}