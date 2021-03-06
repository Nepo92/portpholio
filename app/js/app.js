/* Slider */

export default class Slider {
  constructor(selector, options) {
    this.slider = document.querySelector(selector);
    this.options = options; // чтобы опции были доступны в js файле
    this.render();
    this.setup();
  }

  render() {
    const {
      arrows, dots,
    } = this.options;
    this.slider.classList.add('slider');
    this.visible = [];
    this.slideItems = document.querySelectorAll('.works__column');

    if (arrows === true) { // Если нужны arows, создаем их
      this.arrows();
    }

    if (dots === true) { // Если нужны dots, создаем их
      this.dots();
    }
  }

  setup() {
    this.sliderSwipe();
    this.sliderPage();
    this.dotActive();
  }

  arrows() {
    const arrowContainer = document.createElement('div');
    const arrowLeft = document.createElement('div');
    const arrowRight = document.createElement('div');
    const angleLeft = document.createElement('I');
    const angleRight = document.createElement('I');
    // Добавляем контейнер со стрелками

    this.slider.appendChild(arrowContainer);
    arrowContainer.classList.add('slider__arrows');
    // Добавляем стрелки

    arrowContainer.appendChild(arrowLeft);
    arrowLeft.classList.add('slider__left');
    arrowLeft.setAttribute('tabindex', '0');

    arrowContainer.appendChild(arrowRight);
    arrowRight.classList.add('slider__right');
    arrowRight.setAttribute('tabindex', '0');
    // Добавляем в стрелки иконки fontawesome

    arrowLeft.appendChild(angleLeft);
    angleLeft.classList.add('fas');
    angleLeft.classList.add('fa-angle-left');
    angleLeft.style.pointerEvents = 'none';

    arrowRight.appendChild(angleRight);
    angleRight.classList.add('fas');
    angleRight.classList.add('fa-angle-right');
    angleRight.style.pointerEvents = 'none';
  }

  dots() {
    this.dotContainer = document.createElement('div');
    this.dotContainer.classList.add('slider__dots');

    this.slideItems.forEach((item) => {
      if (!item.classList.contains('hide')) {
        this.visible.push(item);
      }
    });

    if (document.querySelector('.slider__dots')) {
      document.querySelector('.slider__dots').parentNode.removeChild(document.querySelector('.slider__dots'));
    }

    this.slider.appendChild(this.dotContainer);

    const dotsCount = Math.ceil(this.visible.length / this.options.slidesToShow);

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider__dot');
      dot.setAttribute('tabindex', '0');
      this.dotContainer.appendChild(dot);
    }
  }

  dotActive() {
    const dots = document.querySelectorAll('.slider__dot');

    dots.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.prev = index * this.options.slidesToShow;
        this.next = this.prev + this.options.slidesToShow - 1;

        Array.from(item.parentNode.children).forEach((elem) => {
          elem.classList.remove('active');
        });

        item.classList.add('active');
      });
    });

    this.sliderPage(); // подключеие this.prev и this.next
  }

  sliderPage() {
    // Настройка отображения слайдов

    this.visible.forEach((item, index) => {
      item.classList.add('hide');
      if (index >= this.prev && index <= this.next) {
        item.classList.remove('hide');
      }
    });
    // Навигация слайда

    const dots = document.querySelectorAll('.slider__dot');

    for (let j = 0; j < this.visible.length; j += this.options.slidesToShow) {
      const q = j / this.options.slidesToShow;
      if (this.prev === j) {
        for (let i = 0; i < dots.length; i++) {
          dots[i].classList.remove('active');
        }
        if (dots[q] !== undefined) {
          dots[q].classList.add('active');
        }
      }
    }
    // Обнуление margin-right;

    this.visible.forEach((item, index) => {
      if (index % 2 !== 0) {
        item.style.marginRight = '0';
      }
    });
  }

  sliderSwipe() {
    this.prev = 0;
    this.next = this.options.slidesToShow - 1;

    // свайп при помощи мышки
    this.slider.onmousedown = (event) => {
      const start = event.clientX;
      this.slider.onmouseup = (e) => {
        const end = e.clientX;
        const diff = start - end;
        if (diff === 0) {
          this.slideWithAngle(event);
        }
        if (this.options.sliderTouch === true) {
          if (diff >= 100) {
            this.swipeLeft();
          } else if (diff <= -100) {
            this.swipeRight();
          }
        }
      };
    };

    // свайп с помощью touch скрин
    this.slider.ontouchstart = (event) => {
      const start = event.changedTouches[0].clientX;
      this.slider.ontouchend = (e) => {
        const end = e.changedTouches[0].clientX;
        const diff = start - end;

        if (this.options.sliderTouch === true) {
          if (diff >= 100) {
            this.swipeLeft();
          } else if (diff <= -100) {
            this.swipeRight();
          }
        }
      };
    };

    // Переключение слайдов с помощью dots

    const dots = document.querySelectorAll('.slider__dots');

    dots.forEach((item) => {
      item.addEventListener('click', () => {
        this.dotActive();
      });
    });
  }

  swipeLeft() {
    this.prev -= this.options.slidesToShow;
    this.next -= this.options.slidesToShow;

    let end = this.visible.length;

    if (end % this.options.slidesToShow !== 0) {
      do {
        end++;
      } while (end % this.options.slidesToShow !== 0);
    }

    if (this.prev < 0) {
      this.prev = end - this.options.slidesToShow;
      this.next = end - 1;
    } else if (this.visible.length <= this.options.slidesToShow) {
      this.prev = 0;
      this.next = this.options.slidesToShow - 1;
    }

    this.sliderPage(); // подключение this.prev и this.next
  }

  swipeRight() {
    this.prev += this.options.slidesToShow;
    this.next += this.options.slidesToShow;

    let end = this.visible.length;

    if (end % this.options.slidesToShow !== 0) {
      do {
        end++;
      } while (end % this.options.slidesToShow !== 0);
    }

    if (this.next >= end) {
      this.prev = 0;
      this.next = this.options.slidesToShow - 1;
    } else if (this.visible.length <= this.options.slidesToShow) {
      this.prev = 0;
      this.next = this.options.slidesToShow - 1;
    }

    this.sliderPage(); // подключение this.prev и this.next
  }

  slideWithAngle(event) {
    if (event.target.classList.contains('slider__left')) {
      this.swipeLeft();
    } else if (event.target.classList.contains('slider__right')) {
      this.swipeRight();
    }
  }
}
/* Anchors */

function anchor() {
  const linkNav = document.querySelectorAll('[href^="#"]'); // выбираем все ссылки к якорю на странице
  const speed = 0.5; // скорость

  for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
      e.preventDefault();

      const offset = window.pageYOffset; // производим прокрутку
      const hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
      const { top } = document.querySelector(hash).getBoundingClientRect();
      let start = null;

      function step(time) {
        if (start === null) start = time;
        const progress = time - start;
        const scroll = (top < 0 ? Math.max(offset - progress / speed, offset + top)
          : Math.min(offset + progress / speed, offset + top));

        window.scrollTo(0, scroll);
        if (scroll !== offset + top) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash; // URL с хэшем
        }
      }
      requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
    }, false);
  }
}
/* close menu */
function closeMenu() {
  const layer = document.querySelector('.top-bar__layer');
  const menuCheckbox = document.querySelector('.top-bar__checkbox');

  menuCheckbox.addEventListener('change', () => {
    if (menuCheckbox.checked) {
      layer.addEventListener('click', () => {
        menuCheckbox.checked = false;
      });

      const menuItems = document.querySelectorAll('.top-bar__item');

      menuItems.forEach((item) => {
        item.addEventListener('click', () => {
          menuCheckbox.checked = false;
        });
      });
    }
  });
}

/* Up */
function scrollToTop() {
  const up = document.querySelector('.up');

  document.addEventListener('scroll', () => {
    if (scrollY >= 500) {
      up.style.opacity = '1';
      up.style.pointerEvents = 'all';
    } else {
      up.style.opacity = '0';
      up.style.pointerEvents = 'none';
    }
  });
}



function portpholio() {
  anchor();
  scrollToTop();
  closeMenu();
}

portpholio();
