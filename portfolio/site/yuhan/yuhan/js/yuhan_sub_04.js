$(function(){

    var box = $("body");
           

            $(".sub_menu ul li").click(function(){
                var i = $(this).index();
                $(".sub_menu ul li").removeClass('selected');
                $(this).addClass("selected");
                $('.sub_menu_list > div').hide();
                $('.sub_menu_list > div').eq(i).show();
                return false;
            });
      
    

        $("form li:nth-child(2) .bli").click(function(){
            $("form li:nth-child(2) .bli").removeClass("selected1");
            $(this).addClass("selected1");
        })

        $(".num span").click(function(){
            $(".num span").removeClass("on");
            $(this).addClass("on");
        })

        

    });



   


