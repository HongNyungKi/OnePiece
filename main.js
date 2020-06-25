$(function () {
    //---------SECTION-HEADER-----------
    var $window = $(window),
        $header = $(".header-container"),
        $headerClone = $header.contents().clone(),
        $headerContainer = $("<div class='header-container-clone'></div>"),
        $threshold = $header.offset().top + $header.outerHeight();

    $headerContainer.append($headerClone);
    $headerContainer.find(".logo").remove();
    $headerContainer.appendTo("header");


    $window.scroll(function () {
        if ($(this).scrollTop() >= $threshold) {
            $header.addClass("unvisible");
            $headerContainer.addClass("visible");
        } else {
            $header.removeClass("unvisible");
            $headerContainer.removeClass("visible");
        }
    });

    //---------------------------

    //-------------SECTION-SLIDER-----------
    var container = $(".slideShow"),
        slideGroup = container.find(".slideShow_slides"),
        slides = slideGroup.find('a'),
        nav = container.find(".slideShow_nav"),
        indicator = container.find(".indicator"),
        slidesCount = slides.length,
        indicatorHtml = "",
        currentIndex = 0.,
        duration = 500,
        easing = "easeInOutExpo",
        interval = 3500,
        timer;

    slides.each(function (i) {
        var newLeft = i * 100 + "%";
        $(this).css({
            left: newLeft
        });

        indicatorHtml += '<a href="">' + (i + 1) + '</a>';
    });
    indicator.html(indicatorHtml);

    function goToSlide(index) {
        slideGroup.animate({
            left: -100 * index + "%"
        }, duration);
        currentIndex = index;

        upDateNav();
    }

    function upDateNav() {
        var navPrev = nav.find(".prev");
        var navNext = nav.find(".next");

        if (currentIndex == 0) {
            navPrev.addClass("disabled");
        } else {
            navPrev.removeClass("disabled");
        }

        if (currentIndex == slidesCount - 1) {
            navNext.addClass("disabled");
        } else {
            navNext.removeClass("disabled");
        }

        indicator.find("a").eq(currentIndex).addClass("active").siblings().removeClass("active");
    }

    //indicator로 이동하기
    indicator.find("a").click(function (e) {
        e.preventDefault();
        var idx = $(this).index();
        goToSlide(idx);
    });

    //nav로 이동하기
    nav.find("i").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("prev")) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    })



    //자동 슬라이드 함수
    function startTimer() {
        timer = setInterval(function () {
            var nextIndex = (currentIndex + 1) % slidesCount;
            goToSlide(nextIndex);
        }, interval)
    }

    function stopTimer() {
        clearInterval(timer);
    }

    container.mouseenter(function () {
        stopTimer();
    });
    container.mouseleave(function () {
        startTimer();
    });

    upDateNav();
    startTimer();
    //---------------------------------------
    //-----------------SECTION MOVIE---------
    var $recnetMovieBg = $(".column1"),
        $pastMovieBg = $(".past-movie"),
        $moreMovieBg = $(".more"),
        $recentImg = $recnetMovieBg.find("img"),
        $pastBg1 = $pastMovieBg.children(":eq(0)"),
        $pastBg2 = $pastMovieBg.children(":eq(1)"),
        $pastImg1 = $pastBg1.find("img"),
        $pastImg2 = $pastBg2.find("img"),
        $moreImg = $moreMovieBg.find(".image-wrap");

    $recentImg.mouseenter(function () {
        $recnetMovieBg.css({
            background: "#1F64A9"
        });
    });
    $recentImg.mouseleave(function () {
        $recnetMovieBg.css({
            background: "#F6F6F6"
        });
    });
    $pastImg1.mouseenter(function () {
        $pastBg1.css({
            background: "#1F64A9"
        });
    });
    $pastImg1.mouseleave(function () {
        $pastBg1.css({
            background: "#F6F6F6"
        });
    });
    $pastImg2.hover(function () {
        $pastBg2.toggleClass("active");
    });
    $moreImg.hover(function () {
        $moreImg.toggleClass("active");
    });
    //--------------------------------------
    //-------amimation------
    $("#first").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        $("#recent").addClass("active");
        $("#previous").removeClass("active");

        $("#line").addClass("one");
        $("#line").removeClass("two");
        $("#line").removeClass("three");
        $("#line").removeClass("four");


    });
    $("#second").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        $("#previous").addClass("active");
        $("#recent").removeClass("active");

        $("#line").addClass("two");
        $("#line").removeClass("one");
        $("#line").removeClass("three");
        $("#line").removeClass("four");
    })
    $("#third").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        $("#pastAniPay").addClass("active");
        $("#recent").removeClass("active");
        $("#previous").removeClass("active");

        $("#line").addClass("three");
        $("#line").removeClass("one");
        $("#line").removeClass("two");
        $("#line").removeClass("four");
    })
    //-----------------
    var $menu = $(".main-menu ul li"),
        $contents = $("section");

    $menu.click(function (e) {
        e.preventDefault();

        var idx = $(this).index();
        var section = $contents.eq(idx);
        var sectionDistance = section.offset().top - 90;

        $("html,body").stop().animate({
            scrollTop: sectionDistance
        })
    })

    $(window).scroll(function () {
        $contents.each(function () {
            if ($(this).offset().top <= $(window).scrollTop()) {
                var idx = $(this).index();
                $menu.removeClass("on");
                $menu.eq(idx).addClass("on");
            }
        })

    })

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 300) {
            $(".go_top").fadeIn();
        } else {
            $(".go_top").fadeOut();
        }
    })
    $(".go_top").click(function (e) {
        e.preventDefault();
        $("html,body").stop().animate({
            scrollTop: 0
        }, 500)
    })
    //.............................................
    var $books = $(".section-books"),
        $slider = $books.find(".slider"),
        $button = $books.find("button");
    $ul = $books.find("ul");
    $button.click(function () {
        $slider.toggleClass("active");
    });

    var $books = $(".section-books"),
        $label = $books.find("label");

    $label.hover(function () {
        $(this).find("i").attr('class', 'fas fa-unlock unlock');
    }, function () {
        $(this).find("i").attr('class', 'fas fa-lock lock');
    });

});