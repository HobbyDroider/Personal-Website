/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */


(function ($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).load(function () {
        let i;
        const li_ul = document.querySelectorAll(".col_ul li  ul");
        for (i = 0; i < li_ul.length; i++) {
            li_ul[i].style.display = "none"
        }

        var exp_li = document.querySelectorAll(".col_ul li > span");
        for (i = 0; i < exp_li.length; i++) {
            exp_li[i].style.cursor = "pointer";
            exp_li[i].onclick = showul;
        }

        function showul() {
            const nextul = this.nextElementSibling;
            if (nextul.style.display === "block")
                nextul.style.display = "none";
            else
                nextul.style.display = "block";
        }

        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

    })


    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function () {

        $('#intro h1').fitText(1, {minFontSize: '42px', maxFontSize: '84px'});

    }, 100);


    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();


    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],
            [700, 2],
            [960, 3]
        ],
        navigationText: false
    });


    /*----------------------------------------------------- */
    /* Alert Boxes
      ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function () {
        $(this).parent().fadeOut(500);
    });


    /*----------------------------------------------------- */
    /* Stat Counter
      ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({

        handler: function (direction) {

            if (direction === "down") {

                stats.each(function () {
                    var $this = $(this);

                    $({Counter: 0}).animate({Counter: $this.text()}, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });

            }

            // trigger once only
            this.destroy();

        },

        offset: "90%"

    });


    /*---------------------------------------------------- */
    /*	Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');

    containerProjects.imagesLoaded(function () {

        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    function ceasar(s) {
        return s.split("").reverse().join("")
    }

    /*-----------------------------------------------------*/
    /* Navigation Menu
 ------------------------------------------------------ */


    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    // toggle button
    toggleButton.on('click', function (e) {

        e.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();

    });

    // nav items
    nav.find('li a').on("click", function () {

        // update the toggle button
        toggleButton.toggleClass('is-clicked');
        // fadeout the navigation panel
        nav.fadeOut();

    });


    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */

    let sections = $("section"),
        navigationLinks = $("#nav li a"),
        navHeight = $("#nav").height();

    let topSectionCurrent;
    let topSectionNext;
    let scrollPos;


    var throttled = throttle(function () {
        scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        sections.each(function (i, obj) {
            topSectionCurrent = $(obj).position().top - navHeight;
            topSectionNext =
                i < sections.length - 1
                    ? $(sections[i + 1]).position().top - navHeight
                    : Number.MAX_SAFE_INTEGER;

            var scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
            console.log(scrollPos + "===" + scrollMaxY);


            // Check for max scroll first
            if (scrollPos >= scrollMaxY - 5) {
                navigationLinks.parent().removeClass("current");
                let active_link = $('#nav a[href="#contact"]');
                active_link.parent().addClass("current");
            } else if (scrollPos + 1 >= topSectionCurrent && scrollPos < topSectionNext) {
                navigationLinks.parent().removeClass("current");
                let active_link = $('#nav a[href="#' + $(obj).attr("id") + '"]');
                active_link.parent().addClass("current");
            }
        });


    }, 50);

    $(window).scroll(throttled);


    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function (e) {

        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 400, 'swing', function () {
            window.location.hash = target;
        });

    });

    // Sort ULs
    String.prototype.includes = function (str) {
        return this.indexOf(str) !== -1;
    }

    function sortUL(selector) {
        var $ul = (selector);
        $ul.find('li').sort(function (a, b) {
            if ($(a).text().includes('...')) return 1;

            var upA = $(a).text().toUpperCase();
            var upB = $(b).text().toUpperCase();


            return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
        }).appendTo(selector);
    }

    $('.to_be_sorted').each(function (i, obj) {
        sortUL($(this));
    });


    /*---------------------------------------------------- */
    /*  Placeholder Plugin Settings
    ------------------------------------------------------ */
    $('input, textarea, select').placeholder()


    /*---------------------------------------------------- */
    /*	contact form
    ------------------------------------------------------ */
    $('#email').text(ceasar('moc.liamg@proc.tezamod.pisoj'));
    $('#email').on('click', function () {
        $(this).attr('href', ceasar('moc.liamg@proc.tezamod.pisoj:otliam'));

    });

    $('#place').html(ceasar('airtsuA' +
        '>/rb<ldeisuentamarG 0442' +
        '>/rb<6/1/1 gewrehcsiF'));

    $('#mob').text(ceasar("5593174 676 34+ :eliboM"));

    //resize todo image

    /*----------------------------------------------------- */
    /* Back to top
 ------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function () {

        if (!($("#header-search").hasClass('is-visible'))) {

            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }

        }

    });


})(jQuery);


window.onload = function () {

    /*Hiding the navigation on the first site*/
    $('header').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() >= $('#intro').height() - 1) {
            $('header').fadeIn(200);
        } else {
            $('header').fadeOut(200);
        }
    });
}

/*Underscore.js 1.11.0
https://underscorejs.org
(c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
Underscore may be freely distributed under the MIT license.*/
function throttle(func, wait, options) {
    var now = Date.now || function () {
        return new Date().getTime();
    };

    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var _now = now();
        if (!previous && options.leading === false) previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = _now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}