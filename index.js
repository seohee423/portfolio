/* title 이벤트 */
document.addEventListener("DOMContentLoaded", function () {
  const titleContainers = document.querySelectorAll('.seohee, .portfolio, .about, .project, .skills, .tools, .contact');
  const delay = 800; // 각 요소가 나타나기까지의 지연 시간 (밀리초)

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  titleContainers.forEach((container) => {
    let elements = Array.from(container.querySelectorAll('.title-alphabet'));
    elements = shuffle(elements);
    let currentIndex = 0;

    function showNextElement() {
      if (elements.length > 0) {
        const currentElement = elements[currentIndex];
        currentElement.classList.remove('hidden');
        currentElement.classList.add('visible');

        const previousIndex = (currentIndex === 0) ? elements.length - 1 : currentIndex - 1;
        const previousElement = elements[previousIndex];
        previousElement.classList.remove('visible');
        previousElement.classList.add('hidden');

        currentIndex = (currentIndex + 1) % elements.length;

        setTimeout(showNextElement, delay);
      }
    }

    showNextElement();
  });
});


/* main 마우스 이미지 이벤트 */
document.addEventListener('DOMContentLoaded', function () {
  const mainWrapper = document.querySelector('.main-wrapper');
  const mouseImgContainer = mainWrapper.querySelector('.mouse-img-container');
  const mouseImgs = mouseImgContainer.querySelectorAll('.mouse-img');
  let lastRandomIndex = -1;
  let lastMouseX = -1;
  let lastMouseY = -1;
  let consecutiveCount = 0;
  let timeoutId = null;
  let repeatCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // Randomly choose repeat count between 3 to 10

  mainWrapper.addEventListener('mousemove', function (event) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const x = event.clientX;
    const y = event.clientY;

    // Calculate distance between current and last mouse position
    const distance = Math.sqrt(Math.pow(x - lastMouseX, 2) + Math.pow(y - lastMouseY, 2));

    // Show image if the mouse has moved more than 30 pixels (adjust as needed)
    if (distance > 40) {
      let randomIndex = getRandomIndex();

      // Ensure that the same image does not appear consecutively more than repeatCount times
      while (randomIndex === lastRandomIndex && consecutiveCount >= repeatCount) {
        randomIndex = getRandomIndex();
      }

      // If the same image is repeated more than repeatCount times consecutively, change the image
      if (randomIndex === lastRandomIndex) {
        consecutiveCount++;
      } else {
        consecutiveCount = 0;
        repeatCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // Randomly choose new repeat count
      }

      lastRandomIndex = randomIndex;
      lastMouseX = x;
      lastMouseY = y;

      // Show the random image at the mouse cursor position
      showImageAtPosition(randomIndex, x, y);
    }

    timeoutId = setTimeout(function () {
      hideAllImages();
      timeoutId = null;
      consecutiveCount = 0; // Reset consecutive count when mouse movement stops
      repeatCount = Math.floor(Math.random() * (10 - + 1)) + 3; // Randomly choose new repeat count
    }, 500); // Delay set to 500ms (adjust as needed)
  });

  function getRandomIndex() {
    return Math.floor(Math.random() * mouseImgs.length);
  }

  function showImageAtPosition(index, mouseX, mouseY) {
    const img = mouseImgs[index];
    img.style.display = 'block';
    img.style.left = mouseX + 'px';
    img.style.top = mouseY + 'px';
  }

  function hideAllImages() {
    mouseImgs.forEach(function (img) {
      img.style.display = 'none';
    });
  }
});


/* main 배경 색상 변경 */
document.addEventListener('DOMContentLoaded', function () {
  const mainWrapper = document.querySelector('body');
  const colors = ['#FF85BF', '#FFD53F', '#59D6E7'];
  let currentIndex = 0;
  let intervalId = null;
  let scrollStopped = false;

  function changeBackgroundColor() {
    if (!scrollStopped) {
      mainWrapper.style.backgroundColor = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
    }
  }

  function startColorInterval() {
    intervalId = setInterval(changeBackgroundColor, 4000);
  }

  function stopColorInterval() {
    clearInterval(intervalId);
    scrollStopped = true;
  }

  function resumeColorInterval() {
    scrollStopped = false;
    changeBackgroundColor();
    startColorInterval();
  }

  startColorInterval();

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400 && !scrollStopped) {
      // Stop changing background color when scrolled down
      stopColorInterval();
      mainWrapper.style.backgroundColor = '#f3f3ef'; // Restore original background color
    } else if (window.scrollY <= 400 && scrollStopped) {
      // Resume changing background color when scrolled back to top
      resumeColorInterval();
    }
  });
});


/* contact 배경 색상 변경 */
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const contactWrapper = document.querySelector('.contact-wrapper');
  const colors = ['#FF85BF', '#FFD53F', '#59D6E7'];
  let currentIndex = 0;
  let intervalId = null;
  let isContactVisible = false;

  function changeBackgroundColor() {
    body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
  }

  function startColorInterval() {
    intervalId = setInterval(changeBackgroundColor, 3000);
  }

  function stopColorInterval() {
    clearInterval(intervalId);
    body.style.backgroundColor = '#f3f3ef'; // 원래 배경색으로 복원
  }

  function handleScroll() {
    const contactRect = contactWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const contactVisibleThreshold = windowHeight * 0.3; // 30% 이상 벗어났을 때

    // .contact-wrapper가 뷰포트의 30% 이상 들어왔는지 확인
    const isPartiallyInViewport = (contactRect.top <= windowHeight * 0.7 && contactRect.bottom >= windowHeight * 0.3);

    if (isPartiallyInViewport && !isContactVisible) {
      // .contact-wrapper가 30% 이상 들어왔고, 아직 배경색 변경이 시작되지 않았을 때
      isContactVisible = true;
      startColorInterval();
    } else if (!isPartiallyInViewport && isContactVisible) {
      // .contact-wrapper가 30% 이상 벗어났고, 배경색 변경이 진행 중일 때
      isContactVisible = false;
      stopColorInterval();
    }

    if (contactRect.bottom < -contactVisibleThreshold || contactRect.top > windowHeight + contactVisibleThreshold) {
      // .contact-wrapper가 30% 이상 벗어났고, 배경색 변경이 진행 중일 때
      isContactVisible = false;
      stopColorInterval();
    }
  }

  window.addEventListener('scroll', handleScroll);
});


/* about 소개글 이벤트 */
document.addEventListener('DOMContentLoaded', function () {
  const aboutTxt = document.querySelector('.about-txt');
  const spans = document.querySelectorAll('.about-txt span');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function showSpans() {
    if (isInViewport(aboutTxt)) {
      spans.forEach((span) => {
        span.classList.add('visible');
      });

      // Remove the scroll event listener after all spans are visible
      window.removeEventListener('scroll', showSpans);
    }
  }

  // Delay the initial check by 1 second (1000 milliseconds)
  setTimeout(() => {
    window.addEventListener('scroll', showSpans);
    showSpans(); // Initial check in case the element is already in view
  }, 1000); // 1000 milliseconds = 1 second
});


/* project 1 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  // .project-contents1 요소를 가져옵니다.
  const projectContents1 = document.querySelector('.project-contents1');

  // .project-slide-box 요소를 가져옵니다.
  const projectSlideBox = projectContents1.querySelector('.project-slide-box');

  // .project-img 요소를 가져옵니다.
  const projectImg = projectContents1.querySelector('.project-img');

  // Intersection Observer 콜백 함수
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 해당 요소가 뷰포트에 진입한 경우
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); // .project-slide-box의 간격을 좁힘
        observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 중지
      } else {
        projectSlideBox.classList.remove('active'); // .project-slide-box의 간격을 원래대로 복원
      }
    });
  };

  // Intersection Observer 옵션
  const observerOptions = {
    root: null, // 뷰포트를 기준으로
    threshold: 0.5 // 50%가 보이면 콜백 실행
  };

  // Intersection Observer 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // .project-img를 관찰
  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents = document.querySelector('.project-contents');
  const projectSlideBox = document.querySelector('.project-slide-box');
  const projectImg = document.querySelector('.project-img');

  projectContents.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      this.style.transform = 'translateX(-30%)'; // .project-contents를 왼쪽으로 이동
    } else if (target.closest('.project-img')) {
      this.style.transform = 'translateX(0)'; // .project-contents를 오른쪽으로 이동 (원래 위치)
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const projectContentsList = document.querySelectorAll('.project-contents');

  projectContentsList.forEach(function (projectContents) {
    projectContents.addEventListener('click', function (event) {
      const target = event.target;

      if (target.closest('.project-slide-box')) {
        this.classList.toggle('active');
      } else if (target.closest('.project-img')) {
        this.classList.remove('active');
      }
    });
  });
});

/* project 2 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  // .project-contents2 요소를 가져옵니다.
  const projectContents2 = document.querySelector('.project-contents2');

  // .project-slide-box 요소를 가져옵니다.
  const projectSlideBox = projectContents2.querySelector('.project-slide-box');

  // .project-img 요소를 가져옵니다.
  const projectImg = projectContents2.querySelector('.project-img');

  // Intersection Observer 콜백 함수
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 해당 요소가 뷰포트에 진입한 경우
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); // .project-slide-box의 간격을 좁힘
        observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 중지
      } else {
        projectSlideBox.classList.remove('active'); // .project-slide-box의 간격을 원래대로 복원
      }
    });
  };

  // Intersection Observer 옵션
  const observerOptions = {
    root: null, // 뷰포트를 기준으로
    threshold: 0.5 // 50%가 보이면 콜백 실행
  };

  // Intersection Observer 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // .project-img를 관찰
  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents2 = document.querySelector('.project-contents2');

  // .project-contents2 요소에 클릭 이벤트 추가
  projectContents2.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      // .project-contents2를 왼쪽으로 이동
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      // .project-contents2를 오른쪽으로 이동 (원래 위치)
      this.style.transform = 'translateX(0)';
    }
  });
});

/* project 3 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  // .project-contents3 요소를 가져옵니다.
  const projectContents3 = document.querySelector('.project-contents3');

  // .project-slide-box 요소를 가져옵니다.
  const projectSlideBox = projectContents3.querySelector('.project-slide-box');

  // .project-img 요소를 가져옵니다.
  const projectImg = projectContents3.querySelector('.project-img');

  // Intersection Observer 콜백 함수
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 해당 요소가 뷰포트에 진입한 경우
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); // .project-slide-box의 간격을 좁힘
        observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 중지
      } else {
        projectSlideBox.classList.remove('active'); // .project-slide-box의 간격을 원래대로 복원
      }
    });
  };

  // Intersection Observer 옵션
  const observerOptions = {
    root: null, // 뷰포트를 기준으로
    threshold: 0.5 // 50%가 보이면 콜백 실행
  };

  // Intersection Observer 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // .project-img를 관찰
  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents3 = document.querySelector('.project-contents3');

  // .project-contents3 요소에 클릭 이벤트 추가
  projectContents3.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      // .project-contents3를 왼쪽으로 이동
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      // .project-contents3를 오른쪽으로 이동 (원래 위치)
      this.style.transform = 'translateX(0)';
    }
  });
});


/* project 4 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  // .project-contents4 요소를 가져옵니다.
  const projectContents4 = document.querySelector('.project-contents4');

  // .project-slide-box 요소를 가져옵니다.
  const projectSlideBox = projectContents4.querySelector('.project-slide-box');

  // .project-img 요소를 가져옵니다.
  const projectImg = projectContents4.querySelector('.project-img');

  // Intersection Observer 콜백 함수
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 해당 요소가 뷰포트에 진입한 경우
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); // .project-slide-box의 간격을 좁힘
        observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 중지
      } else {
        projectSlideBox.classList.remove('active'); // .project-slide-box의 간격을 원래대로 복원
      }
    });
  };

  // Intersection Observer 옵션
  const observerOptions = {
    root: null, // 뷰포트를 기준으로
    threshold: 0.5 // 50%가 보이면 콜백 실행
  };

  // Intersection Observer 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // .project-img를 관찰
  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents4 = document.querySelector('.project-contents4');

  // .project-contents4 요소에 클릭 이벤트 추가
  projectContents4.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      // .project-contents4를 왼쪽으로 이동
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      // .project-contents4를 오른쪽으로 이동 (원래 위치)
      this.style.transform = 'translateX(0)';
    }
  });
});


/* global-menu scroll event */
document.addEventListener('DOMContentLoaded', function() {
  const globalMenuLinks = document.querySelectorAll('.global-menu a');

  globalMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

/* mouse wheel event */