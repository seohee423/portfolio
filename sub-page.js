$(window).on('scroll', () => {
  const scrollY = $(window).scrollTop();
  const viewportHeight = $(window).height();

  if (scrollY > viewportHeight * 0.6) {
    $('header').addClass('on');
  } else {
    $('header').removeClass('on');
  }
});