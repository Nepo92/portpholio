document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order__form');
  const popup = document.querySelector('.order__popup');
  const popupClose = document.querySelector('.order__popup_close');

  async function send(event) {
    event.preventDefault();
    // Данные из формы
    const formData = new FormData(form);
    // Popup
    const popupResult = document.querySelector('.order__popup_result');
    // Button
    const button = document.querySelector('.order__button');

    const request = await fetch('order.php', {
      method: 'POST',
      body: formData,
    });

    if (request.ok) {
      popup.style.display = 'flex';
      popupResult.textContent = 'Сообщение отправлено! Ждите моего ответа';
      button.setAttribute('disabled', 'disabled');
      form.reset();
    } else {
      popup.style.display = 'flex';
      popupResult.textContent = 'Ошибка! Попробуйте заного';
    }
  }

  form.addEventListener('submit', send);

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});
