var $ = jQuery;

$(function () {
 



    $("#top_navi , .navbg").mouseenter(function () {
        $("#top_navi #mainnav li .subnav").stop().slideDown();
        $(".navbg").stop().fadeIn();
    }).mouseleave(function () {
        $("#top_navi #mainnav li .subnav").stop().slideUp();
        $(".navbg").stop().fadeOut();
    });

    /* navibg 슬라이드 */
    var img = $(".navbg > div > ul > li");
    var imgLen = img.length - 1;
    cnt = 0;
    start();


    function start() {
        setInterval(function () {
            (cnt == imgLen) ? cnt = 0 : cnt++;
            img.eq(cnt - 1).css({ left: "10px" }).stop().animate({ left: "-236px" });
            img.eq(cnt).css({ left: "236px" }).stop().animate({ left: "10px" });
        }, 3500);
    }









    /* 모바일 */
    var naviClon = $("#top_navi").contents().clone()
    $(".mb_mainnav").append(naviClon);

    $("#mobile_menu > span").click(function () {
        $(".mb_navi").css("display", "block");
        $("body").css("overflow", "hidden");
    });

    $(".mb_mainnav > ul > li > a").click(function () {

        $(this).find("+ul").slideToggle("slow");

        $(this).toggleClass("selected");

        $(".mb_mainnav > ul > li > a").not(this).find("+ul").slideUp("slow");
        $(".mb_mainnav > ul > li > a").not(this).removeClass("selected");

    })

    $(".mb_close").click(function () {
        $(".mb_mainnav > ul > li > a").removeClass("selected");
        $(".mb_mainnav > ul > li > a").not(this).find("+ul").slideUp("slow")
        $(".mb_navi").css("display", "none");
        $("body").css("overflow", "auto");
    });



    $(window).resize(function () {

        if ($(this).outerWidth() >= 800) {
            $(".mb_navi").css("display", "none");
        }
    });

    $(window).resize(function () {

        if ($(this).outerWidth() <= 320) {
            $("#contents #newsroom p").css("font-size", "0.8em");
        } else {
            $("#contents #newsroom p").css("font-size", "")
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

    $(".thumbnail ul li:first-child").addClass("selected");

    $(".thumbnail ul li").click(function () {
        $(".thumbnail ul li").not(this).removeClass("selected");
        $(this).addClass("selected");

        $('.frame1wrap .imgleft ul li:first-child img').attr({
            src: $(this).find('img').attr('src')
        })
    });


    $(".menu_list li").click(function () {

        var c_no = $(this).data("number");

        $(".click > div").eq(c_no).find(".thumbnail ul li:first-child").addClass("selected");

        $(".click > div").eq(c_no).find('.frame1wrap .imgleft ul li img').attr({
            src: $(".click > div").eq(c_no).find('.thumbnail ul li:first-child img').attr('src')
        })
        $(".click").css("display", "block");
        $(".click > div").eq(c_no).css("display", "block");

        $("body").css("overflow", "hidden");
        return false;
    });

    $(".closebtn").click(function () {
        $(".click").css("display", "none");
        $(".click > div").css("display", "none");
        $("body").css("overflow", "auto");







    });

    /* vision 이미지 fade-in out */

    var img1 = $(".vrightimg img");
    var imglen1 = img1.length - 1;
    var cnt1 = 0;

    function start1() {
        setInterval(function () {
            (cnt1 == imglen1) ? cnt1 = 0 : cnt1++;
            img1.eq(cnt1 - 1).css({ opacity: "1" }).stop().animate({ opacity: "0" },);
            img1.eq(cnt1).css({ opacity: "0" }).stop().animate({ opacity: "1" },);
        }, 3000)

    }

    start1();










    /*  팝업*/











});
