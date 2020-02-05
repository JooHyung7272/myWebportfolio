$(document).ready(function(){
  // 새로고침(F5) 시 페이지 상단으로 이동 !
  // $("html, body").animate({ scrollTop: 0 }, "slow");

  // MadyByJooHyung(.mbj)의 가로정렬
  var pfwidth = $(".pf").width();
  console.log(pfwidth);
  $(".mbj").css({width: pfwidth});

  // 로그인바 풀다운네비게이션
  $("#loginWrap").on("mouseover", function(){
    $("#loginmenu").stop().css({display: ""}).slideDown();
  })
  $("#loginWrap").on("mouseout", function(){
    $("#loginmenu").stop().slideUp();
  })


  // 메뉴바에 있는 카테고리를 클릭 했을 시 !
  $("#portfolio a").on("click", function(e){
    var pagePos = $($(this).attr("href")).position().top;
    $("html, body, main").animate({ scrollTop: pagePos });
    e.preventDefault();
  })

  $("#gnb li").on("click", function(e){
    var pagePos = $($(this).children("a").attr("href")).position().top;
    $("html, body, main").animate({ scrollTop: pagePos });
    e.preventDefault();
  })

  // Contact me를 클릭 했을 시 !
  $("#bannerimg a").on("click", function(e){
    var pagePos = $($(this).attr("href")).position().top;
    $("html, body").animate({ scrollTop: pagePos });
    e.preventDefault();
  })

  // 마우스 휠 이벤트
  $("section").on("mousewheel", function(event, delta) {
    var menustr = $(this).index();
    console.log(menustr);
    // 휠을 올렸을 경우
      if ( delta > 0 ){
        var prev = $(this).prev().position().top;
        $("html, body, main").stop().animate({ scrollTop: prev })
        var prevIndex = $(this).index();
        // console.log("마우스 휠 올린 index값 : " + prevIndex);
        if ( prevIndex < 1  ) {
            prevIndex = 0;
        }
      }
      // 휠을 내렸을 경우
      else if ( delta < 0  ) {
        var next = $(this).next().position().top;
        $("html, body, main").stop().animate({ scrollTop: next })
        var nextIndex = $(this).index();
        // console.log("마우스 휠 내린 index값 : " + nextIndex);
        if ( nextIndex > 3 ) {
            nextIndex = 3
        }
      }
  })

  // 페이지 이동 시 메뉴바 나타나게 하는 이벤트 !
  var view = true;
  $(window).on("scroll", function(){
    if($(window).scrollTop() >= ($("#mainbanner").height()) && view == true){
      $("#header").css({ position: "fixed",
                         width: "100%",
                         height: 0,
                         zIndex: 9999,
                       }).animate({ height: 100 });
      view = false;
    } else if ( $(window).scrollTop() < ($("#mainbanner").height()) && view == false){
      $("#header").css({ position: "absolute" })
      view = true;
    }
  })

  // main
  var typingBool = false;
  var typingIdx=0;
  var typingTxt = $(".typing-txt").text(); // 타이핑될 텍스트를 가져온다
  typingTxt = typingTxt.split(""); // 한글자씩 자른다.
  if(typingBool == false){ // 타이핑이 진행되지 않았다면
     typingBool = true;
     var tyInt = setInterval(typing,100); // 반복동작
  }
  function typing(){
    if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복
      $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
        typingIdx++;
      } else{
        clearInterval(tyInt); //끝나면 반복종료
      }
  }


  // Technology
  $("#usingskill p").css({opacity: 0});
  $("#usingskill img").css({opacity: 0});
  // usingskill의 첫번째 p태그 중앙배열하기위한 넓이값.
  var p1widthlength = $("#usingskill").width()/2-($(".p1").width()/2);
  var img1widthlength = $("#usingskill").width()/2-(1000/2);
  var img2widthlength = $("#usingskill").width()/2-(1332/2);
  console.log("img1widthlength : " + img1widthlength);
  $("#usingskill").each(function(){
    var $section = $(this);
    var secPos = $section.position().top;
    console.log(secPos);
    $(window).on("scroll", function(){
      if($(window).scrollTop() >= secPos-500 || $(window).scrollTop() >= secPos){
        $section.children(".p1").animate({opacity: 1, left: p1widthlength}, 1000);
        setTimeout(function(){
          $section.children(".p2").animate({opacity: 1});
        },300)
        setTimeout(function(){
          $section.children(".img1").children("img").animate({opacity: 1, left: img1widthlength}, 1000);
        },500)
        setTimeout(function(){
          $section.children(".img2").children("img").animate({opacity: 1, left: img2widthlength}, 1000);
        },700)
      }
    })
  })

  // About me
  $("#introduce").each(function(){
    var $section = $(this);
    var secPos = $section.position().top;
    $(window).on("scroll", function(){
      if($(window).scrollTop() >= secPos-500 || $(window).scrollTop() >= secPos){
        $section.find(".movingbar1").animate({width: "90%"}, 1000);
        setTimeout(function(){
          $section.find(".movingbar2").animate({width: "90%"}, 1000);
        },100)
        setTimeout(function(){
          $section.find(".movingbar3").animate({width: "85%"}, 1000);
        },200)
        setTimeout(function(){
          $section.find(".movingbar4").animate({width: "80%"}, 1000);
        },300)
        setTimeout(function(){
          $section.find(".movingbar5").animate({width: "70%"}, 1000);
        },400)
        setTimeout(function(){
          $section.find(".movingbar6").animate({width: "60%"}, 1000);
        },500)
        setTimeout(function(){
          $section.find(".movingbar7").animate({width: "70%"}, 1000);
        },600)
        setTimeout(function(){
          $section.find(".movingbar8").animate({width: "80%"}, 1000);
        },700)
        setTimeout(function(){
          $section.find(".movingbar9").animate({width: "80%"}, 1000);
        },800)
        setTimeout(function(){
          $section.find(".movingbar10").animate({width: "60%"}, 1000);
        },900)
      }
    })
  })

})
