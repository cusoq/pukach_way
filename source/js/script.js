"use strict";

const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const menuToggleButton = document.querySelector(".header__menu-toggle-button");
const popup = document.querySelector(".navigation__list");
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

const tabButtons = document.querySelectorAll(".detals__tab-button");
const tabBlocks = document.querySelectorAll(".detals__tab-block");


// открытие-закрытие модального окна
const togglePopup = function () {
  popup.classList.toggle("navigation__list--hidden");
};

// переключение вида кнопки открытия-закрытия меню
const toggleOpenCloseButton = function () {
  menuToggleButton.classList.toggle("header__menu-toggle-button--burger");
  menuToggleButton.classList.toggle("header__menu-toggle-button--cross");
};

const toggleMenu = function () {
  togglePopup();
  toggleOpenCloseButton();
};

// Хендлеры

const onClickToggler = function (evt) {
  evt.preventDefault();
  toggleMenu();
};

const onEnterOpener = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    window.removeEventListener("keydown", onEnterOpener);
    toggleMenu();
  }
};

const onEscCloser = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    window.removeEventListener("keydown", onEscCloser);
    popup.classList.add("navigation__list--hidden");
    menuToggleButton.classList.remove("header__menu-toggle-button--cross");
    menuToggleButton.classList.add("header__menu-toggle-button--burger");
  }
}

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

// Переключение табов

const switchTabs = (evt) => {
  tabButtons.forEach(element => element.classList.remove("detals__tab-button--active"));
  if (evt.target) { evt.target.classList.add("detals__tab-button--active"); };

  tabBlocks.forEach(element => {
    if (element.dataset.country === evt.target.dataset.country) {
      element.classList.remove("visually-hidden");
    } else {
      element.classList.add("visually-hidden");
    }
  });
}

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

const onClickTabShower = function(evt) {
  evt.preventDefault();
  switchTabs(evt);
};

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
//
menuToggleButton.addEventListener("keydown", onEnterOpener);
menuToggleButton.addEventListener("click", onClickToggler);
document.addEventListener("keydown", onEscCloser);
/////////////////////////////////
tabButtons.forEach(element => element.addEventListener("click", onClickTabShower));

