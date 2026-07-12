(function($){
  $(function(){

    $('.parallax').parallax();
    // smooth scroll to local hrefs
    $('a').filter(function() { 
      return this.href.match('\#.+'); 
    }).on('click', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    });
    // project mouseover/mouseout effects
    $('.project-container').hover(
      function(ev) {  // mouseenter 
        ev.preventDefault();
        $(this).find('.proj-title').finish();
        $(this).find('.proj-title').hide();
        $(this).find('.proj-desc').slideDown();
        $(this).find('.proj-desc').show();
        $(this).find('.proj-desc').addClass('bg-text');
      }, function(ev) { //mouseleave
        ev.preventDefault();
        $(this).find('.proj-title').fadeIn();
        $(this).find('.proj-title').show();
        $(this).find('.proj-desc').finish();
        $(this).find('.proj-desc').slideUp();
        $(this).find('.parallax-container').removeClass('bg-text');
      });

  }); // end of document ready
})(jQuery); // end of jQuery name space
