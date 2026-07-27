$(function(){
    var h_top; //각 콘텐츠 스크롤 위치 값
    var box_name, box_id;


    $(".sidebar li:first div").addClass("on");

    $(".sidebar li").click(function(){
        box_name = $(this).find("a").attr("href");
        h_top = $(box_name).offset().top;
        
        $("html, body").animate({
            scrollTop: h_top

        }, 400);

        return false;

       
    });

    


    $(window).scroll(function(){
        var st = $(this).scrollTop();


        //각 콘텐츠 영역에 도달시 해당 메뉴 활성화

        $("#contents > div").each(function() {
            var i = $(this).index();
        if($(this).offset().top - 60 <= st){
                $(".sidebar li").removeClass("on");
                $(".sidebar li").eq(i).addClass("on");
             }
        });

      /*   if(st >= ($("#contents").height() - $(window).height())){
            $(".sidebar li").removeClass("on");
            $(".sidebar li:last").addClass("on");
        }
 */
        

      

    });//end scroll
    
    $(window).trigger("scroll");
   
      


   

});
