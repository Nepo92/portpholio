window.addEventListener('scroll', () => {
  const technologies = document.querySelectorAll('.technologies__column');

  if (window.pageYOffset >= 150) {
    technologies.forEach((item, index) => {
      if (index < 4) {
        item.style.opacity = '1';
        item.style.top = '0';
      }
    });
  }

  if (window.pageYOffset >= 250) {
    technologies.forEach((item, index) => {
      if (index >= 4) {
        item.style.opacity = '1';
        item.style.top = '0';
      }
    });
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
