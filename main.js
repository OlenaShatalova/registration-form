console.log("Hello, World!");
import { updateCountdown } from "./js/countdown.js";

/// Запуск таймера (вставте свою дату в targetDate в ./js/countdown.js")
updateCountdown();

/// Логіка модального вікна
const modal = document.querySelector("#modal-js");
const openModalBtn = document.querySelector("#openModal-js");
const closeModalBtn = document.querySelector("#closeModal-js");

const modalContent = document.querySelector("#modalContent-js");
const container = document.querySelector("#container-js");
const registerWrapper = document.querySelector("#registerWrapper-js");
const formWrapper = document.querySelector("#registerForm-js");

openModalBtn.addEventListener("click", () => {
  modal.classList.add("show"); //відкриваємо модальне вікно
  modalContent.appendChild(registerWrapper); // додаємо вміст реєстрації в модальне вікно
  registerWrapper.classList.remove("box-shadow", "padding"); // прибираємо тінь та падінги з контенера реєстрації
  openModalBtn.style.display = "none"; // приховуємо кнопку відкриття
  formWrapper.style.display = "grid"; // показуємо форму реєстрації
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show"); // закриваємо модальне вікно i повертаємо всі елементи на місце
  container.appendChild(registerWrapper);
  registerWrapper.classList.add("box-shadow", "padding");
  openModalBtn.style.display = "block";
  formWrapper.style.display = "none";
});

//// форма реєстрації

// const form = document.getElementById("registerForm");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = form.name.value.trim();
//   const email = form.email.value.trim();
//   const phone = form.phone.value.trim();
//   const checkbox = form.querySelector('input[type="checkbox"]').checked;

//   if (!name || !email || !phone || !checkbox) {
//     alert("Будь ласка, заповніть всі поля та погодьтеся з умовами.");
//     return;
//   }

//   if (!/\S+@\S+\.\S+/.test(email)) {
//     alert("Введіть коректний email.");
//     return;
//   }

//   fetch("https://example.com/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, phone }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Реєстрація успішна!");
//         form.reset();
//       } else {
//         alert("Сталася помилка. Спробуйте ще раз.");
//       }
//     })
//     .catch(() => alert("Сталася помилка. Спробуйте ще раз."));
// });
