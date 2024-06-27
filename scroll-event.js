/* mouse wheel event */
$(document).ready(function () {
  const sections = $('.section');
  const numSections = sections.length;
  let currentSection = 0;
  let isAnimating = false;

  function updateCurrentSection(index) {
    currentSection = index;
    isAnimating = true;
    $('html, body').stop().animate({
      scrollTop: $(sections[currentSection]).offset().top
    }, 800, function () {
      isAnimating = false;
    });
  }

  $('header a').on('click', function (e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const targetSection = $(targetId);

    if (targetSection.length) {
      const targetIndex = sections.index(targetSection);

      if (targetIndex !== -1) {
        updateCurrentSection(targetIndex);
      }
    }
  });

  $(window).on('wheel', function (e) {
    if (isAnimating) {
      return;
    }

    e.preventDefault();

    const delta = e.originalEvent.deltaY;

    if (delta > 0 && currentSection < numSections - 1) {
      currentSection++;
    } else if (delta < 0 && currentSection > 0) {
      currentSection--;
    }

    updateCurrentSection(currentSection);
  });

  $(window).on('scroll', function () {
    if (isAnimating) {
      return;
    }

    let newSectionIndex = currentSection;

    sections.each(function (index, section) {
      const sectionTop = $(section).offset().top;
      const sectionHeight = $(section).outerHeight();
      const scrollTop = $(window).scrollTop();

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        newSectionIndex = index;
        return false;
      }
    });

    if (newSectionIndex !== currentSection) {
      currentSection = newSectionIndex;
    }
  });
});
