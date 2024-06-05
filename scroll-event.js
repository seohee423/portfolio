/* mouse wheel event */
$(document).ready(function () {
  const sections = $('.section');
  const numSections = sections.length;
  let currentSection = 0;
  let isAnimating = false;

  $(window).on('wheel', function (e) {
    if (isAnimating) {
      return; // 현재 애니메이션 중이면 더 이상의 이벤트를 무시합니다.
    }

    e.preventDefault(); // 기본 스크롤 동작을 막습니다.

    const delta = e.originalEvent.deltaY;
    isAnimating = true; // 애니메이션이 시작됨을 표시합니다.

    if (delta > 0) {
      currentSection++;
    } else {
      currentSection--;
    }

    // 섹션 인덱스를 0 이상, numSections - 1 이하로 제한합니다.
    currentSection = Math.max(0, Math.min(currentSection, numSections - 1));

    // 해당 섹션의 맨 위로 매끄럽게 스크롤합니다.
    $('html, body').stop().animate({
      scrollTop: $(sections[currentSection]).offset().top
    }, 800, function () {
      isAnimating = false; // 애니메이션이 완료되면 다시 이벤트를 받을 수 있게 합니다.
    });
  });
});
