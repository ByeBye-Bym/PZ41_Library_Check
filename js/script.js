"use strict";

const bookSelect = document.querySelector("#book-select");
const checkButton = document.querySelector("#check-button");
const result = document.querySelector("#result");
const status = document.querySelector("#status");

const catalog = {
  atlas: { title: "Атлас мира", available: true },
  novel: { title: "Загадки океана", available: false },
  guide: { title: "Путеводитель по космосу", available: true },
};

// TODO 1. Верните новый Promise. Внутри setTimeout (900 мс)
// проверьте catalog[code].available: если true — resolve(book.title),
// иначе — reject(new Error("Книга временно недоступна")) .
function checkAvailability(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = catalog[code];

      if (book && book.available === true) {
        resolve(book.title);
      } else {
        reject(new Error("Книга временно недоступна"));
      }
    }, 900);
  });
}

checkButton.addEventListener("click", () => {
  checkButton.disabled = true;
  result.textContent = "Проверяем каталог...";
  status.className = "status status--working";
  status.textContent = "Ожидание ответа...";

  // TODO 2. Вызовите checkAvailability(bookSelect.value).
  // TODO 3. В .then() выведите сообщение об успехе в result.
  // TODO 4. В .catch() покажите error.message и оформите ошибку.
  // TODO 5. В .finally() снова включите кнопку.
  checkAvailability(bookSelect.value)
    .then((title) => {
      result.textContent = "Книга доступна: " + title;
      status.className = "status status--success";
      status.textContent = "Можно бронировать.";
    })
    .catch((error) => {
      result.textContent = error.message;
      status.className = "status status--error";
      status.textContent = "Проверка не удалась.";
    })
    .finally(() => {
      checkButton.disabled = false;
    });
});
