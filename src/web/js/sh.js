function loadTemplate(tmpls){
  var base="/js/sh/";
  for (var i =0;i<tmpls.length;i++){
    var url=base+tmpls[i];
    $('body').append("<script src='"+url+"'></script>");
  }
}
$(function(){
  loadTemplate (
   [
      'shBrushAppleScript.js',
      'shBrushAS3.js',
      'shBrushBash.js',
      'shBrushColdFusion.js',
      'shBrushCpp.js',
      'shBrushCSharp.js',
      'shBrushCss.js',
      'shBrushDelphi.js',
      'shBrushDiff.js',
      'shBrushErlang.js',
      'shBrushGroovy.js',
      'shBrushJava.js',
      'shBrushJavaFX.js',
      'shBrushJScript.js',
      'shBrushPerl.js',
      'shBrushPhp.js',
      'shBrushPlain.js',
      'shBrushPython.js',
      'shBrushRuby.js',
      'shBrushSass.js',
      'shBrushScala.js',
      'shBrushSql.js',
      'shBrushVb.js',
      'shBrushXml.js'

]);
});


