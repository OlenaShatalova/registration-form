console.log("Hello, World!");
import { updateCountdown } from "./js/countdown.js";

/// Запуск таймера (вставте свою дату в targetDate в ./js/countdown.js")
updateCountdown();

const modal = document.querySelector("#modal-js");
const openModalBtn = document.querySelector("#openModal-js");
const closeModalBtn = document.querySelector("#closeModal-js");

const modalContent = document.querySelector("#modalContent-js");
const container = document.querySelector("#container-js");
const registerWrapper = document.querySelector("#registerWrapper-js");
const form = document.querySelector("#registerForm-js");

const inputs = form.querySelectorAll("input");
const email = form.querySelector('input[type="email"]');
const checkbox = form.querySelector('input[type="checkbox"]');
// console.log(inputs);

///====================================
/// Логіка модального вікна
openModalBtn.addEventListener("click", () => {
  modal.classList.add("show"); //відкриваємо модальне вікно
  modalContent.appendChild(registerWrapper); // додаємо вміст реєстрації в модальне вікно
  registerWrapper.classList.remove("box-shadow", "padding", "position"); // прибираємо тінь та падінги з контенера реєстрації, переміщуємо по центру
  openModalBtn.style.display = "none"; // приховуємо кнопку відкриття
  form.style.display = "grid"; // показуємо форму реєстрації
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show"); // закриваємо модальне вікно i повертаємо всі елементи на місце
  container.appendChild(registerWrapper);
  registerWrapper.classList.add("box-shadow", "padding", "position"); // додаємо тінь та падінги до контейнера реєстрації
  openModalBtn.style.display = "block";
  form.style.display = "none";
});

///====================================
//// форма реєстрації
