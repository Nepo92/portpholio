window.addEventListener('scroll', () => {
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
      }, i * 200);
    }
  }

  const works = document.querySelector('.works__inner');

  if (window.pageYOffset >= 730) {
    works.style.opacity = '1';
    works.style.top = '0';
  }

  const testimonialsTitle = document.querySelector('.testimonials__title');
  const testimonials = document.querySelector('.testimonials__content');

  if (window.pageYOffset >= 1466) {
    testimonialsTitle.style.opacity = '1';
    testimonialsTitle.style.top = '0';
    testimonials.style.opacity = '1';
    testimonials.style.top = '0';
  }

  const orderTitle = document.querySelector('.order__title');

  if (window.pageYOffset >= 1741) {
    orderTitle.style.opacity = '1';
    orderTitle.style.top = '0';
  }

  const orderInputs = document.querySelectorAll('input');
  const orderTextarea = document.querySelector('.order__description');
  const orderButton = document.querySelector('.order__button');

  if (window.pageYOffset >= 1950) {
    orderInputs.forEach((item, index) => {
      if (index > 0) {
        item.style.top = '0';
        item.style.opacity = '1';
      }
    });

    orderTextarea.style.top = '0';
    orderTextarea.style.right = '0';
    orderTextarea.style.opacity = '1';

    orderButton.style.opacity = '1';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const headerIcon = document.querySelectorAll('.header__icon');

  headerIcon.forEach((item) => {
    item.style.opacity = '1';
  });
});
