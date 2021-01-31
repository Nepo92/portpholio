window.addEventListener('scroll', () => {
  if (innerWidth > 1550) {
    const technologies = document.querySelectorAll('.technologies__column');
    const techTitle = document.querySelector('.technologies__title');

    if (window.pageYOffset >= 150) {
      techTitle.style.opacity = '1';
      techTitle.style.top = '0';
    }

    if (window.pageYOffset >= 180) {
      for (let i = 0; i < technologies.length; i++) {
        setTimeout(() => {
          technologies[i].style.opacity = '1';
          technologies[i].style.top = '0';
        }, i * 300);
      }
    }

    const works = document.querySelector('.works__inner');

    if (window.pageYOffset >= 730) {
      works.style.visibility = 'visible';
      works.style.top = '0';
    }

    const testimonialsTitle = document.querySelector('.testimonials__title');
    const testimonials = document.querySelector('.testimonials__content');

    if (window.pageYOffset >= 1466) {
      testimonialsTitle.style.visibility = 'visible';
      testimonialsTitle.style.top = '0';
      testimonials.style.visibility = 'visible';
      testimonials.style.top = '0';
    }

    const orderTitle = document.querySelector('.order__title');

    orderTitle.style.opacity = '1';
    orderTitle.style.top = '0';

    const orderInputs = document.querySelectorAll('input');

    if (window.pageYOffset >= 1950) {
      orderInputs.forEach((item, index) => {
        if (index > 0) {
          item.style.top = '0';
          item.style.opacity = '1';
        }
      });

      const orderTextarea = document.querySelector('.order__description');

      orderTextarea.style.top = '0';
      orderTextarea.style.opacity = '1';

      const orderButton = document.querySelector('.order__button');

      orderButton.style.opacity = '1';
    }
  }
});
