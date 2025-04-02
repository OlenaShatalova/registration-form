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

// const inputs = form.querySelectorAll("input");
// const email = form.querySelector('input[type="email"]');
// const checkbox = form.querySelector('input[type="checkbox"]');
// console.log(inputs);

const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[type="email"]');
const phoneInput = form.querySelector('input[name="phone"]');
const checkbox = form.querySelector('input[type="checkbox"]');
const submitButton = form.querySelector("button[type='submit']");

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

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 768 && modal.classList.contains("show")) {
//     modal.classList.remove("show"); // Закриваємо модальне вікно
//     container.appendChild(registerWrapper); // Повертаємо вміст реєстрації назад до контейнера
//     registerWrapper.classList.add("box-shadow", "padding", "position");

//     openModalBtn.style.display = "none";
//     form.style.display = "grid";
//   }
// });

///====================================
// Валідація форми

///====================================
//// форма реєстрації
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
  };

  if (checkbox.checked) {
    sendData(formData, form); // викликаємо функцію для відправки даних
  }
});
//

async function sendData(formData, form) {
  try {
    // console.log("Відправка даних на endpoint:", formData); // Виводимо дані перед відправкою

    const response = await fetch("https://example.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Помилка реєстрації");
    alert("Форма успішно відправлена!");
    form.reset();
  } catch (error) {
    alert("Помилка відправки форми");
  }
}
