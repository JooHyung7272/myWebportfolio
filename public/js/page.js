$(document).ready(function(){
  var tablewidth = $("table").width();
  console.log("테이블 넓이 : " + tablewidth);
  $(".btn").css({width: tablewidth});
  console.log("div 넓이 : " + $(".btn").width());
});
