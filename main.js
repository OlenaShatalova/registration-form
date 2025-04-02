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

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && modal.classList.contains("show")) {
    modal.classList.remove("show"); // Закриваємо модальне вікно
    container.appendChild(registerWrapper); // Повертаємо вміст реєстрації назад до контейнера
    registerWrapper.classList.add("box-shadow", "padding", "position");

    openModalBtn.style.display = "none";
    form.style.display = "grid";
  }
});

///====================================
// Валідація форми
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const phoneInput = form.querySelector('input[name="phone"]');
const privacyCheckbox = form.querySelector(".custom-checkbox");
const submitButton = form.querySelector('button[type="submit"]');

console.log(nameInput, emailInput, phoneInput, privacyCheckbox, submitButton);

function deleteError(input) {
  input.classList.remove("error");
}

function validate(field) {
  if (field.name === "name") {
    if (field.value.trim() === "") {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  } else if (field.name === "email") {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(field.value.trim())) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  } else if (field.name === "phone") {
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(field.value.trim())) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  } else if (field.type === "checkbox") {
    if (!field.checked) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  }
}

[nameInput, emailInput, phoneInput].forEach((field) => {
  field.addEventListener("input", () => validate(field));
});

privacyCheckbox.addEventListener("change", () => validate(privacyCheckbox));

///====================================
////  відправка форми реєстрації
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Перевіряємо всі поля перед відправкою
  let isValid = true;
  [nameInput, emailInput, phoneInput, privacyCheckbox].forEach((input) => {
    validate(input); // Викликаємо валідацію для кожного поля
    if (input.classList.contains("error")) {
      isValid = false;
    }
  });

  // Якщо всі поля пройшли валідацію, відправляємо дані
  if (isValid) {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    sendData(formData, form); // Викликаємо функцію для відправки даних
  } else {
    alert("Будь ласка, виправте помилки у формі.");
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
