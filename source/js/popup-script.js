"use strict";

const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const menuToggleButton = document.querySelector(".header__menu-toggle-button");
const popup = document.querySelector(".navigation__list");

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

// Обработчики событий

menuToggleButton.addEventListener("keydown", onEnterOpener);
menuToggleButton.addEventListener("click", onClickToggler);
document.addEventListener("keydown", onEscCloser);
