/// Логіка валідації форми
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.checkValidity()) {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
    }
  });
});
email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Введіть коректну електронну адресу");
  } else {
    email.setCustomValidity("");
  }
});
checkbox.addEventListener("input", () => {
  if (checkbox.checked) {
    checkbox.classList.remove("error");
  } else {
    checkbox.classList.add("error");
  }
});

// Валідація форми перед відправкою
form.addEventListener("input", () => {
  if (form.checkValidity()) {
    form.querySelector('button[type="submit"]').disabled = false;
  } else {
    form.querySelector('button[type="submit"]').disabled = true;
  }
});

///====================================
function isModalOpen() {
  return modal.classList.contains("show"); // Перевіряємо, чи модальне вікно відкрите
}
