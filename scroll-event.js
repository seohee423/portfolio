/* mouse wheel event */
$(document).ready(function () {
  const sections = $('.section');
  const numSections = sections.length;
  let currentSection = 0;
  let isAnimating = false;

  $(window).on('wheel', function (e) {
    if (isAnimating) {
      return;
    }

    e.preventDefault();

    const delta = e.originalEvent.deltaY;
    isAnimating = true;

    if (delta > 0) {
      currentSection++;
    } else {
      currentSection--;
    }

    currentSection = Math.max(0, Math.min(currentSection, numSections - 1));

    $('html, body').stop().animate({
      scrollTop: $(sections[currentSection]).offset().top
    }, 800, function () {
      isAnimating = false;
    });
  });
});
