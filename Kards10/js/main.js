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
    var sections = $("section"),
        navigation_links = $("#nav li a");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#nav a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'
    });


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
