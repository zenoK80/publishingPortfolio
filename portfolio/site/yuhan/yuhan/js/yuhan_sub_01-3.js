var $ = jQuery;

$(function(){
    $("#top_navi").mouseover(function(){
        $("#top_navi #mainnav li .subnav").show();
        

    }).mouseout(function(){
        $("#top_navi #mainnav li .subnav").hide();

    });

    /* 모바일 */
    var naviClon = $("#top_navi").contents().clone()
     $(".mb_mainnav").append(naviClon);

     $("#mobile_menu > span").click(function(){
        $(".mb_navi").css("display","block");
        $("body").css("overflow","hidden");
     });

     $(".mb_mainnav > ul > li > a").click(function(){
       
        $(this).find("+ul").slideToggle("slow");
        
        $(this).toggleClass("selected");

        $(".mb_mainnav > ul > li > a").not(this).find("+ul").slideUp("slow");
        $(".mb_mainnav > ul > li > a").not(this).removeClass("selected");
        
     })

     $(".mb_close").click(function(){
        $(".mb_mainnav > ul > li > a").removeClass("selected");
        $(".mb_mainnav > ul > li > a").not(this).find("+ul").slideUp("slow")
        $(".mb_navi").css("display","none");
        $("body").css("overflow","auto");
     });

     $(window).resize(function(){

        if($(this).outerWidth() >= 800){
            $(".mb_navi").css("display","none");
        }
     });

    $(window).resize(function () {

        if ($(this).outerWidth() <=320) {
            $("#contents #newsroom p").css("font-size","0.8em");
        }else{
            $("#contents #newsroom p").css("font-size","")
        }
    });

    $(window).trigger("resize");


/* 
    const content = "Great & Global \n 유한양행 인류건강의 길을 앞서갑니다";
    const text = document.querySelector(".text1");
    let i = 0;
    
    function typing(){
        
        let txt = content[i++];
        text.innerHTML += txt=== "\n" ? "<br/>": txt;
        if (i > content.length) {
            text.textContent = "";
            i = 0;
        }
    }
    setInterval(typing, 200) */


    $(".border ul li").click(function(){
        $(".border ul li").removeClass("on");
        $(this).addClass("on");

        $(".contents > div").hide();
        $(".contents > div").eq($(this).index()).show();
        
    });


    



 
   
    
   

    
    
    

    
    

     
});
