$(document).ready(function () {

    // ==========================
    // Sticky Navbar & Scroll Button
    // ==========================
    $(window).scroll(function () {

        if ($(this).scrollTop() > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        if ($(this).scrollTop() > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    // ==========================
    // Scroll To Top
    // ==========================
    $('.scroll-up-btn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // ==========================
    // Mobile Menu Functions
    // ==========================
    function closeMenu() {

        $('.navbar .menu').removeClass('active');
        $('body').removeClass('no-scroll');

        $('.menu-btn')
            .attr('aria-expanded', 'false');

        $('.navbar .menu')
            .attr('aria-hidden', 'true');

        $('.menu-btn i')
            .removeClass('fa-times')
            .addClass('fa-bars');
    }

    // ==========================
    // Menu Toggle
    // ==========================
    $('.menu-btn').on('click keydown', function (e) {

        if (
            e.type === 'keydown' &&
            e.key !== 'Enter' &&
            e.key !== ' ' &&
            e.key !== 'Spacebar'
        ) {
            return;
        }

        $('.navbar .menu').toggleClass('active');
        $('body').toggleClass('no-scroll');

        const isMenuOpen = $('.navbar .menu').hasClass('active');

        $('.menu-btn').attr(
            'aria-expanded',
            isMenuOpen
        );

        $('.navbar .menu').attr(
            'aria-hidden',
            !isMenuOpen
        );

        $('.menu-btn i')
            .toggleClass('fa-bars', !isMenuOpen)
            .toggleClass('fa-times', isMenuOpen);
    });

    // ==========================
    // Close Menu When Link Clicked
    // ==========================
    $('.navbar .menu li a').click(function () {
        closeMenu();
    });

    // ==========================
    // Close Menu On Escape Key
    // ==========================
    $(document).keydown(function (e) {

        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // ==========================
    // Auto Close Menu On Resize
    // ==========================
    $(window).resize(function () {

        if ($(window).width() > 947) {
            closeMenu();
        }
    });

    // ==========================
    // Owl Carousel
    // ==========================
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

});