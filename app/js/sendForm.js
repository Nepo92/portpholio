document.addEventListener('DOMContentLoaded', () => {
  const errors = [];

  function formValidate() {
    const name = document.querySelector('input[name="name"]');
    const errorMessage = document.querySelectorAll('.order__error');
    const email = document.querySelector('input[name="email"]');

    errors.length = 0;
    name.classList.remove('error');
    email.classList.remove('error');

    errorMessage.forEach((item) => {
      item.textContent = '';
      item.style.paddingLeft = '0';
      item.style.marginTop = '0';
      item.style.opacity = '0';
      item.style.transition = 'all 0.2s linear';
    });

    if (name.value === '') {
      errors.push({
        name: 'Введите имя',
      });

      errorMessage[0].style.paddingLeft = '10px';
      errorMessage[0].style.marginTop = '10px';
      errorMessage[0].style.opacity = '1';

      name.classList.add('error');

      errorMessage[0].textContent = errors[0].name;

      return false;
    }

    if (email.value === '') {
      errors.push({
        email: 'Введите email',
      });

      errorMessage[1].textContent = errors[0].email;

      errorMessage[1].style.paddingLeft = '10px';
      errorMessage[1].style.marginTop = '10px';
      errorMessage[1].style.opacity = '1';

      email.classList.add('error');

      return false;
    }

    const domain = email.value.split('@');

    if (domain.length === 2) {
      if (domain[1].split('.').length !== 2) {
        errors.push({
          email: 'Введите правильный email',
        });

        errorMessage[1].textContent = errors[0].email;

        errorMessage[1].style.paddingLeft = '10px';
        errorMessage[1].style.marginTop = '10px';
        errorMessage[1].style.opacity = '1';

        email.classList.add('error');
      }
    }
  }

  const form = document.querySelector('.order__form');
  const popup = document.querySelector('.popup');

  function send(event) {
    event.preventDefault();
    const formData = new FormData(form);

    formValidate();

    if (errors.length === 0) {
      popup.style.opacity = '1';
      popup.style.pointerEvents = 'all';
      document.body.style.overflow = 'hidden';

      const preloader = document.querySelector('.order__preloader');

      preloader.style.opacity = '1';

      const request = fetch('order.php', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        const popupWindow = document.querySelector('.popup__window');
        const popupResult = document.querySelector('.popup__result');

        preloader.style.opacity = '0';
        popupWindow.style.opacity = '1';
        popupWindow.style.top = '60px';

        if (response.ok === true) {
          popupResult.innerHTML = 'Спасибо за заказ! Ждите моего ответа';
          form.reset();
        } else {
          popupResult.innerHTML = 'Произошла ошибка! Попробуйте заного';
        }
      });
    }
  }

  form.addEventListener('submit', send);

  const popupClose = document.querySelector('.popup__close');

  popupClose.addEventListener('click', () => {
    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';
    document.body.style.overflow = 'visible';
  });
});
