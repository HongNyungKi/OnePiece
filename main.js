$(function () {
    //---------SECTION-HEADER-----------
    // $window = $(window),
    //     $header = $("header"),
    //     $headerClone = $header.contents().clone(),
    //     $headerCloneContainer = $('<header class="header-clone"><header>'),
    //     $threshold = $header.offset().top + $header.outerHeight();

    // $headerCloneContainer.append($headerClone);
    // $headerCloneContainer.appendTo("body");

    // $window.scroll(function () {
    //     if ($(this).scrollTop() >= $threshold) {
    //         $headerCloneContainer.addClass("visible");
    //     } else {
    //         $headerCloneContainer.removeClass("visible");
    //     }
    // });
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

});