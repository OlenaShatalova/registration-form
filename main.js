import * as countdown from "./js/countdown.js";

///====================================
// Селектори
///====================================
// для  відкриття модального вікна
const modal = document.querySelector("#modal-js");
const openModalBtn = document.querySelector("#openModal-js");
const closeModalBtn = document.querySelector("#closeModal-js");
// для переміщення контейнера реєстрації
const modalContent = document.querySelector("#modalContent-js");
const sectionContent = document.querySelector("#registerWrapper-js");
const registerContainer = document.querySelector("#portableContainer-js");
const form = document.querySelector("#registerForm-js");
// для валідації та відправки форми
const labels = form.querySelectorAll("label");

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
// Валідація та відправка форми реєстрації
///====================================

const validateForm = () => {
  let isValidForm = true;

  const deleteError = (i) => {
    i.classList.remove("error");
  };

  const addError = (i) => {
    i.classList.add("error");
    isValidForm = false;
  };

  labels.forEach((label) => {
    const input = label.children[0]; // отримуємо інпут з label (має бути перша дитина)

    if (input.type === "checkbox") {
      deleteError(label.children[1]);
      if (!input.checked) {
        addError(label.children[1]);
      }
    } else {
      deleteError(label);

      const value = input.value.trim();

      if (value === "") {
        addError(label);
      } else {
        if (input.type === "text" && value.length < 3) {
          addError(label);
        } else if (input.type === "email") {
          const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(value)) {
            addError(label);
          }
        } else if (input.type === "tel") {
          const phonePattern = /^\+?\d{12}$/;
          if (!phonePattern.test(value)) {
            addError(label);
          }
        }
      }
    }
  });

  return isValidForm;
};

labels.forEach((label) => {
  const input = label.children[0];
  if (input.type === "checkbox") {
    input.addEventListener("change", () => {
      validateForm();
    });
  } else {
    input.addEventListener("input", () => {
      validateForm();
    });
  }
});

form.addEventListener("submit", (e) => {
  const isValid = validateForm();

  console.log("Is form valid:", isValid);
  e.preventDefault();

  // Якщо всі поля пройшли валідацію, відправляємо дані
  if (!isValid) {
    console.log("Форма не валідна");
    // alert("Будь ласка, виправте помилки у формі.");
  } else {
    const { name, email, tel } = e.target.elements;
    console.log(e.target.elements);

    console.log(name, email, tel);
    const formData = {
      name: name.value,
      email: email.value,
      phone: tel.value,
    };

    console.log(formData);

    sendData(formData, form);
  }
});

async function sendData(formData, form) {
  try {
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
