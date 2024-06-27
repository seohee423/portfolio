// 로딩 페이지 화면
$(document).ready(function() {
  setTimeout(function() {
      $('.loader').fadeOut('slow', function() {
          $('.content').fadeIn('slow');
          $('html').css('overflow', 'auto');
      });
  }, 3000);
});


/* title 이벤트 */
document.addEventListener("DOMContentLoaded", function () {
  const titleContainers = document.querySelectorAll('.seohee, .portfolio, .about, .project, .skills, .tools, .contact');
  const delay = 800;

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
  let repeatCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

  mainWrapper.addEventListener('mousemove', function (event) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const x = event.clientX;
    const y = event.clientY;

    const distance = Math.sqrt(Math.pow(x - lastMouseX, 2) + Math.pow(y - lastMouseY, 2));

    if (distance > 40) {
      let randomIndex = getRandomIndex();

      while (randomIndex === lastRandomIndex && consecutiveCount >= repeatCount) {
        randomIndex = getRandomIndex();
      }

      if (randomIndex === lastRandomIndex) {
        consecutiveCount++;
      } else {
        consecutiveCount = 0;
        repeatCount = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
      }

      lastRandomIndex = randomIndex;
      lastMouseX = x;
      lastMouseY = y;

      showImageAtPosition(randomIndex, x, y);
    }

    timeoutId = setTimeout(function () {
      hideAllImages();
      timeoutId = null;
      consecutiveCount = 0;
      repeatCount = Math.floor(Math.random() * (10 - + 1)) + 3; 
    }, 500); 
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
      stopColorInterval();
      mainWrapper.style.backgroundColor = '#f3f3ef';
    } else if (window.scrollY <= 400 && scrollStopped) {
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
    body.style.backgroundColor = '#f3f3ef';
  }

  function handleScroll() {
    const contactRect = contactWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const contactVisibleThreshold = windowHeight * 0.3; 

    const isPartiallyInViewport = (contactRect.top <= windowHeight * 0.7 && contactRect.bottom >= windowHeight * 0.3);

    if (isPartiallyInViewport && !isContactVisible) {
      isContactVisible = true;
      startColorInterval();
    } else if (!isPartiallyInViewport && isContactVisible) {
      isContactVisible = false;
      stopColorInterval();
    }

    if (contactRect.bottom < -contactVisibleThreshold || contactRect.top > windowHeight + contactVisibleThreshold) {
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

      window.removeEventListener('scroll', showSpans);
    }
  }

  setTimeout(() => {
    window.addEventListener('scroll', showSpans);
    showSpans(); 
  }, 1000); 
});


/* project 1 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  const projectContents1 = document.querySelector('.project-contents1');

  const projectSlideBox = projectContents1.querySelector('.project-slide-box');

  const projectImg = projectContents1.querySelector('.project-img');

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); 
        observer.unobserve(entry.target); 
      } else {
        projectSlideBox.classList.remove('active'); 
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
      this.style.transform = 'translateX(-30%)'; 
    } else if (target.closest('.project-img')) {
      this.style.transform = 'translateX(0)'; 
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
  const projectContents2 = document.querySelector('.project-contents2');

  const projectSlideBox = projectContents2.querySelector('.project-slide-box');

  const projectImg = projectContents2.querySelector('.project-img');

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active');
        observer.unobserve(entry.target); 
      } else {
        projectSlideBox.classList.remove('active'); 
      }
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0.5 
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents2 = document.querySelector('.project-contents2');

  projectContents2.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      this.style.transform = 'translateX(0)';
    }
  });
});

/* project 3 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  const projectContents3 = document.querySelector('.project-contents3');

  const projectSlideBox = projectContents3.querySelector('.project-slide-box');

  const projectImg = projectContents3.querySelector('.project-img');

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); 
        observer.unobserve(entry.target); 
      } else {
        projectSlideBox.classList.remove('active'); 
      }
    });
  };

  const observerOptions = {
    root: null, 
    threshold: 0.5 
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents3 = document.querySelector('.project-contents3');

  projectContents3.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      this.style.transform = 'translateX(0)';
    }
  });
});


/* project 4 */
// 스크롤 내리면 박스 간격 축소
document.addEventListener('DOMContentLoaded', function () {
  const projectContents4 = document.querySelector('.project-contents4');

  const projectSlideBox = projectContents4.querySelector('.project-slide-box');

  const projectImg = projectContents4.querySelector('.project-img');

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectSlideBox.classList.add('active'); 
        observer.unobserve(entry.target); 
      } else {
        projectSlideBox.classList.remove('active');
      }
    });
  };

  const observerOptions = {
    root: null, 
    threshold: 0.5 
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  observer.observe(projectImg);
});
// 클릭 시 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  const projectContents4 = document.querySelector('.project-contents4');

  projectContents4.addEventListener('click', function (event) {
    const target = event.target;

    if (target.closest('.project-slide-box')) {
      this.style.transform = 'translateX(-30%)';
    } else if (target.closest('.project-img')) {
      this.style.transform = 'translateX(0)';
    }
  });
});


/* global-menu scroll event */
document.addEventListener('DOMContentLoaded', function () {
  const globalMenuLinks = document.querySelectorAll('.global-menu a');

  globalMenuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

