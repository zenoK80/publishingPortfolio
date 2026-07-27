var $ = jQuery;


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
      
            $(".leftmenu > ul > li:first-child span").click(function(){

                if($(this).text() == "remove"){
                    $(".leftmenu > ul > li:first-child > ul").slideUp();
                    $(this).text("add");
                }else{
                    $(".leftmenu > ul > li:first-child > ul").slideDown();
                    $(this).text("remove");
                }

               
            })
    

  

    });



   


