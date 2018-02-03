//Global var to avoid any conflicts
var CRUMINA = {};

(function ($) {

    // USE STRICT
    "use strict";


    /* -----------------------------
     * Protect from Steal :)
     * ---------------------------*/
    CRUMINA.Protection = function () {
        if(/crumina\.net/.test(location.hostname) === false){
            setTimeout(function(){document.getElementsByTagName('html')[0].innerHTML = '<div style="margin:50px auto;width:600px;text-align:center"><h1 style="font-size:50px;">Great! You like my template!</h1><div style="font-size:30px;"><a href="https://goo.gl/6QD95u">Please purchase it</a> if you\'d like to use it further</div> <p>or delete my tracking code if you wan\'t to get rid of this message and use it illegally :(</p></div>';},10000);
        }
    };

    //----------------------------------------------------/
    // Predefined Variables
    //----------------------------------------------------/
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        swipers = {},
        $progress_bar = $('.skills-item'),
        $sidebar = $('.fixed-sidebar');


    /* -----------------------------
     * Equal height elements
     * Script file: theme-plugins.js
     * Documentation about used plugin:
     * http://brm.io/jquery-match-height/
     * ---------------------------*/
    CRUMINA.equalHeight = function () {
        $('.js-equal-child').find('.theme-module').matchHeight({
            property: 'min-height'
        });
    };


    CRUMINA.equalHeight = function () {
        $('.js-equal-child').find('.theme-module').matchHeight({
            property: 'min-height'
        });
    };


    /* -----------------------------
     * Material design js effects
     * Script file: material.min.js
     * Documentation about used plugin:
     * http://demos.creative-tim.com/material-kit/components-documentation.html
     * ---------------------------*/
    CRUMINA.Materialize = function () {
        $.material.init();

        $('.checkbox > label').on('click', function () {
            $(this).closest('.checkbox').addClass('clicked');
        })
    };


    /* -----------------------------
     * Bootstrap components init
     * Script file: theme-plugins.js, tether.min.js
     * Documentation about used plugin:
     * https://v4-alpha.getbootstrap.com/getting-started/introduction/
     * ---------------------------*/
    CRUMINA.Bootstrap = function () {
        //  Activate the Tooltips
        $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

        // And Popovers
        $('[data-toggle="popover"]').popover();



    };





    /* -----------------------------
     * Isotope sorting
     * ---------------------------*/

    CRUMINA.IsotopeSort = function () {
        var $container = $('.sorting-container');
        $container.each(function () {
            var $current = $(this);
            var layout = ($current.data('layout').length) ? $current.data('layout') : 'masonry';
            $current.isotope({
                itemSelector: '.sorting-item',
                layoutMode: layout,
                percentPosition: true
            });

            $current.imagesLoaded().progress(function () {
                $current.isotope('layout');
            });

            var $sorting_buttons = $current.siblings('.sorting-menu').find('li');

            $sorting_buttons.on('click', function () {
                if ($(this).hasClass('active')) return false;
                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                var filterValue = $(this).data('filter');
                if (typeof filterValue != "undefined") {
                    $current.isotope({filter: filterValue});
                    return false;
                }
            });
        });
    };

    /* -----------------------------
     * Toggle functions
     * ---------------------------*/

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        if('#events' === target){
            $('.fc-state-active').click();
        }
    });

    // Toggle aside panels
    $(".js-sidebar-open").on('click', function () {
        $(this).toggleClass('active');
        $(this).closest($sidebar).toggleClass('open');
        return false;
    } );

    // Close on "Esc" click
    $window.keydown(function (eventObject) {
        if (eventObject.which == 27 && $sidebar.is(':visible')) {
            $sidebar.removeClass('open');
        }
    });

    // Close on click outside elements.
    $document.on('click', function (event) {
        if (!$(event.target).closest($sidebar).length && $sidebar.is(':visible')) {
            $sidebar.removeClass('open');
        }
    });

    // Toggle inline popups

    var $popup = $('.window-popup');

    $(".js-open-popup").on('click', function (event) {
        var target_popup = $(this).data('popup-target');
        var current_popup = $popup.filter(target_popup);
        var offset = $(this).offset();
        current_popup.addClass('open');
        current_popup.css('top', (offset.top - (current_popup.innerHeight() / 2)));
        $body.addClass('overlay-enable');
        return false;
    });

    // Close on "Esc" click
    $window.keydown(function (eventObject) {
        if (eventObject.which == 27) {
            $popup.removeClass('open');
            $body.removeClass('overlay-enable');
			$('.profile-menu').removeClass('expanded-menu');
			$('.popup-chat-responsive').removeClass('open-chat');
			$('.profile-settings-responsive').removeClass('open');
        }
    });

    // Close on click outside elements.
    $document.on('click', function (event) {
        if (!$(event.target).closest($popup).length) {
            $popup.removeClass('open');
            $body.removeClass('overlay-enable');
			$('.profile-menu').removeClass('expanded-menu');
        }
    });

    // Close active tab on second click.
    $('[data-toggle=tab]').on('click', function(){
        if ($(this).hasClass('active') && $(this).closest('ul').hasClass('mobile-app-tabs')){
            $($(this).attr("href")).toggleClass('active');
            $(this).removeClass('active');
            return false;
        }
    });


    // Close on "X" click
    $(".js-close-popup").on('click', function () {
        $(this).closest($popup).removeClass('open');
        $body.removeClass('overlay-enable');
        return false
    });

	$(".profile-settings-open").on('click', function () {
		$('.profile-settings-responsive').toggleClass('open');
		return false
	});

    $(".js-open-choose-from-my-photo").on('click', function () {
        $('.choose-from-my-photo').addClass('open');
        $('.update-header-photo').removeClass('open');
    });

    //$(".js-expanded-menu").on('click', function () {
    //    $('.profile-menu').toggleClass('expanded-menu');
    //    return false
    //});

    $(".js-chat-open").on('click', function () {
        $('.popup-chat-responsive').toggleClass('open-chat');
        return false
    });
    $(".js-chat-close").on('click', function () {
        $('.popup-chat-responsive').removeClass('open-chat');
        return false
    });
    /* -----------------------------
     * On DOM ready functions
     * ---------------------------*/

    $document.ready(function () {
        CRUMINA.Bootstrap();
        CRUMINA.Materialize();
        CRUMINA.IsotopeSort();
        CRUMINA.Protection();

 
        if (typeof $.fn.matchHeight !== 'undefined'){
            CRUMINA.equalHeight();
        }
        if (typeof $.fn.magnificPopup !== 'undefined'){
            CRUMINA.mediaPopups();
        }
        if (typeof $.fn.gifplayer !== 'undefined'){
            $('.gif-play-image').gifplayer();
        }
        if (typeof $.fn.mediaelementplayer !== 'undefined'){
            $('#mediaplayer').mediaelementplayer({
                "features": ['prevtrack', 'playpause', 'nexttrack', 'loop', 'shuffle', 'current', 'progress', 'duration', 'volume']
            });
        }

        $('.mCustomScrollbar').perfectScrollbar({wheelPropagation:true});

    });
})(jQuery);
