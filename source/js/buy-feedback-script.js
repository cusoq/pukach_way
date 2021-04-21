"use strict";

const ESC__KEYCODE = 27;
const feedbackOpenButtons = document.querySelectorAll(".buy-link");
const messageOpenButton = document.querySelector(".main__buy-button");
const modal = document.querySelector(".main__buy");
const modalSuccess = document.querySelector(".main__success");
const cross = modal.querySelector(".main__buy-close-button");
const crossSuccess = modalSuccess.querySelector(".main__success-close-button");
const feedbackForm = modal.querySelector(".main__buy-form");
const questionForm = document.querySelector(".feedback__form");
const nameInput = modal.querySelector(".main__buy-field--tel");
const emailInput = modal.querySelector(".main__buy-field--email");
const storage = "";
const isStorageSupport = true;


// установка фокуса по умолчанию в наиболее подходящее поле
const getFocus = function() {
  if (storage) {
    nameInput.value = storage;
    emailInput.focus();
  } else {
    nameInput.focus();
  }
}

// проверка поддержки localStorage
const checkStorageSupport = function() {
  try {
    let storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }
}

// открытие модального окна
const showPopup = function() {
  modal.classList.remove("main__buy--closed");
  modal.classList.add("main__buy--showed");
  checkStorageSupport();
  getFocus();
};
// закрытие модального окна
const closePopup = function() {
  modal.classList.remove("main__buy--showed");
  modal.classList.add("main__buy--closed");
};

// валидация заполнения полей и запись в localStorage
const checkValues = function() {
  if (!nameInput.value || !emailInput.value) {

    console.log("Заполните поле");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameInput.value);
    }

    feedbackForm.submit();
    closePopup();
    console.log("Сообщение отправлено");
  };
};

// Хендлеры
const onClickOpener = function(evt) {
  evt.preventDefault();
  showPopup();
};

const onClickCloser = function(evt) {
  evt.preventDefault();
  closePopup();
}

const onClickSuccessCloser = function(evt) {
  evt.preventDefault();
  modal.classList.remove("main__buy--showed");
  modal.classList.add("main__buy--closed");
}

const onEscapeCloser = function(evt) {
  if (evt.keyCode === ESC__KEYCODE) {
    evt.preventDefault();
    window.removeEventListener("keydown", onEscapeCloser);
    closePopup();
  }
}

const onSubmit = function(evt) {
  evt.preventDefault();
  checkValues();
  modalSuccess.classList.remove("main__success--closed");
  modalSuccess.classList.add("main__success--showed");
  window.location.replace("index.html");
}

// Обработчики событий

// обрабатываем событие отправки формы
feedbackForm.addEventListener("submit", onSubmit);
questionForm.addEventListener("submit", onSubmit);
// обрабатываем открытие диалогового окна по клику
feedbackOpenButtons.forEach(element => element.addEventListener("click", onClickOpener));
// обрабатываем открытие диалогового окна по Enter
feedbackOpenButtons.forEach(element => element.addEventListener("keydown", onClickOpener));
// обрабатываем закрытие диалогового окна по клику на cross
cross.addEventListener("click", onClickCloser);
crossSuccess.addEventListener("click", onClickSuccessCloser);
// обрабатываем закрытие диалогового окна по Esc
document.addEventListener("keydown", onEscapeCloser);
