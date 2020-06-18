$(function () {
    //---------SECTION-HEADER-----------
    $window = $(window),
        $sectionHeader = $(".section-header"),
        $headerClone = $sectionHeader.contents().clone(),
        $headerCloneContainer = $('<section class="section-header-clone"><section>'),
        $threshold = $sectionHeader.offset().top + $sectionHeader.outerHeight();

    $headerClone.find("img").attr("src", "https://pngimage.net/wp-content/uploads/2018/06/luffy-hat-png-1.png");
    $headerCloneContainer.append($headerClone);
    $headerCloneContainer.appendTo(".web-inner");

    $window.scroll(function () {
        if ($(this).scrollTop() >= $threshold) {
            $headerCloneContainer.addClass("visible");
            $sectionHeader.addClass("unvisible");
        } else {
            $headerCloneContainer.removeClass("visible");
            $sectionHeader.removeClass("unvisible");
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
        $moreImg = $recentImg.find(".image-wrap");

    $recentImg.mouseenter(function () {
        $recnetMovieBg.css({
            background: "#1F64A9"
        });
    });
    $recentImg.mouseleave(function () {
        $recnetMovieBg.css({
            background: "#F6F6F6"
        })
    })
    $pastImg1.mouseenter(function () {
        $pastBg1.css({
            background: "#1F64A9"
        })
    })
    $pastImg1.mouseleave(function () {
        $pastBg1.css({
            background: "#F6F6F6"
        })
    })





    //--------------------------------------



});