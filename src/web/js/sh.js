function loadTemplate(tmpls,cb){
  var base="/js/sh/";
  for (var i =0;i<tmpls.length;i++){
    var count=0;
    count++;
    var url=base+tmpls[i];
    setTimeout(function(){
      //$('body').append("<script src='"+url+"' onLoad='onTemplateLoaded'></script>");
      $.getScript(url,function(){
        count--;
        if (count ===0){
          if (cb){
            cb();
          }
        }
      });
    },0)
    
  }
}


  var brushes={
    "applescript": "shBrushAppleScript.js",
    "actionscript3": "shBrushAS3.js",
    "as3": "shBrushAS3.js",
    "bash": "shBrushBash.js",
    "shell": "shBrushBash.js",
    "coldfusion": "shBrushColdFusion.js",
    "cf": "shBrushColdFusion.js",
    "cpp": "shBrushCpp.js",
    "c": "shBrushCpp.js",
    "c#": "shBrushCSharp.js",
    "c-sharp": "shBrushCSharp.js",
    "csharp": "shBrushCSharp.js",
    "css": "shBrushCss.js",
    "delphi": "shBrushDelphi.js",
    "pascal": "shBrushDelphi.js",
    "diff": "shBrushDiff.js",
    "patch": "shBrushDiff.js",
    "pas": "shBrushDiff.js",
    "erl": "shBrushErlang.js",
    "erlang": "shBrushErlang.js",
    "groovy": "shBrushGroovy.js",
    "java": "shBrushJava.js",
    "jfx": "shBrushJavaFX.js",
    "javafx": "shBrushJavaFX.js",
    "js": "shBrushJScript.js",
    "jscript": "shBrushJScript.js",
    "javascript": "shBrushJScript.js",
    "perl": "shBrushPerl.js",
    "pl": "shBrushPerl.js",
    "php": "shBrushPhp.js",
    "text": "shBrushPlain.js",
    "plain": "shBrushPlain.js",
    "py": "shBrushPython.js",
    "python": "shBrushPython.js",
    "ruby": "shBrushRuby.js",
    "rails": "shBrushRuby.js",
    "ror": "shBrushRuby.js",
    "rb": "shBrushRuby.js",
    "sass": "shBrushSass.js",
    "scss": "shBrushSass.js",
    "scala": "shBrushScala.js",
    "sql": "shBrushSql.js",
    "vb": "shBrushVb.js",
    "vbnet": "shBrushVb.js",
    "xml": "shBrushXml.js",
    "xhtml": "shBrushXml.js",
    "xslt": "shBrushXml.js",
    "html": "shBrushXml.js"
};

