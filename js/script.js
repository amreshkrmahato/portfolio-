$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
          $('.scroll-up-btn').removeClass("show");
        }
    });
    // slide-up script
     $('.scroll-up-btn').click(function(){
       $('html').animate({scrollTop:0})
    });

    //typing animation script
    var typed = new Typed(".typing", {
      strings: ["Developer","Blogger","Designer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });

    // toggle menu/navbar script (improved): switch icon and close on link click
    $('.menu-btn').on('click keypress', function(e){
        if(e.type === 'keydown' && !(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) return;
      var menu = $('.navbar .menu');
      menu.toggleClass('active');
      $('body').toggleClass('no-scroll');
      var icon = $('.menu-btn i');
      var expanded = $(this).attr('aria-expanded') === 'true';
      $(this).attr('aria-expanded', !expanded);
      menu.attr('aria-hidden', expanded);
      // toggle between bars and times (x) icon
      if(icon.hasClass('fa-bars')){
        icon.removeClass('fa-bars').addClass('fa-times');
      } else {
        icon.removeClass('fa-times').addClass('fa-bars');
      }
    });

    // close mobile menu when a nav link is clicked
    $('.navbar .menu li a').click(function(){
      var menu = $('.navbar .menu');
      if(menu.hasClass('active')){
            menu.removeClass('active');
            $('body').removeClass('no-scroll');
        var btn = $('.menu-btn');
        btn.attr('aria-expanded', 'false');
        menu.attr('aria-hidden', 'true');
        var icon = $('.menu-btn i');
        icon.removeClass('fa-times').addClass('fa-bars');
      }
    });
    //owl carousel script
    $('.carousel').owlCarousel({
      margin:20,
      loop: true,
      autoplayTimeOut: 2000,
      autoplayHoverPause: true,
      responsive:{
    0:{
        items:1,
        nav: false

      },
      600:{
        items:2,
        nav: false
        
      },
      1000:{
        items:3,
        nav: false
        
      }
    }
    });
});