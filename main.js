import * as countdown from "./js/countdown.js";

const modal = document.querySelector("#modal-js");
const openModalBtn = document.querySelector("#openModal-js");
const closeModalBtn = document.querySelector("#closeModal-js");

const modalContent = document.querySelector("#modalContent-js");
const sectionContent = document.querySelector("#registerWrapper-js");
const registerContainer = document.querySelector("#addFrom-js");
const form = document.querySelector("#registerForm-js");

///====================================
// Відкриття/закриття модального вікна
///====================================
let isModalOpen = false;

export const openModal = () => {
  if (!isModalOpen) {
    modalContent.appendChild(registerContainer); // додаємо вміст реєстрації в  вікно
    form.classList.add("show"); // додаємо клас видимості до форми

    isModalOpen = true;
  }

  document.body.classList.add("no-scroll");
  modal.classList.add("show");
};

export const closeModal = () => {
  if (isModalOpen) {
    sectionContent.prepend(registerContainer); // повертаємо контейнер реєстрації на місце
    form.classList.remove("show");

    isModalOpen = false; // змінюємо стан на закритий
  }

  document.body.classList.remove("no-scroll"); // дозволяємо прокрутку фону
  modal.classList.remove("show"); // закриваємо модальне вікно
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isModalOpen) {
    closeModal();
  }
});

///====================================
// Валідація форми
///====================================

// const nameInput = form.querySelector('input[name="name"]');
// const emailInput = form.querySelector('input[name="email"]');
// const phoneInput = form.querySelector('input[name="phone"]');
const inputs = form.querySelectorAll("label");
const customCheckbox = form.querySelector(".custom-checkbox");
const submitButton = form.querySelector('button[type="submit"]');

console.log(form, inputs, customCheckbox, submitButton);

console.log(
  inputs.forEach((label) => {
    console.log(label.input);
  })
);

const trim = (input) => {
  if (input.type !== "checkbox") {
    input.value = input.value.trim();
  }
};

const deleteError = (input) => {
  input.classList.remove("error");
};

// const validate = (field) => {
//   if (field.name === "name") {
//     if (field.value.trim() === "") {
//       field.classList.add("error");
//     } else {
//       field.classList.remove("error");
//     }
//   } else if (field.name === "email") {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(field.value.trim())) {
//       field.classList.add("error");
//     } else {
//       field.classList.remove("error");
//     }
//   } else if (field.classList.contains("phone-input")) {
//     const phonePattern = /^\d+$/;
//     if (!phonePattern.test(field.value.trim())) {
//       field.classList.add("error");
//     } else {
//       field.classList.remove("error");
//     }
//   } else if (field.type === "checkbox") {
//     if (!field.checked) {
//       field.classList.add("error");
//     } else {
//       field.classList.remove("error");
//     }
//   }
// };

// [nameInput, emailInput, phoneInput].forEach((field) => {
//   field.addEventListener("input", () => validate(field));
// });

// privacyCheckbox.addEventListener("change", () => validate(privacyCheckbox));

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

  // Логування, чи форма пройшла валідацію
  console.log("Is form valid:", isValid);

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
