/// Таймер зворотного відліку

const countdown = document.querySelector("#countdown-js");
const targetDate = new Date("2025-04-10T19:30:00");

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

export function updateCountdown() {
  const timerId = setInterval(() => {
    const diff = targetDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(diff);
      document.querySelector("[data-days]").textContent = addLeadingZero(days);
      document.querySelector("[data-hours]").textContent =
        addLeadingZero(hours);
      document.querySelector("[data-minutes]").textContent =
        addLeadingZero(minutes);
      document.querySelector("[data-seconds]").textContent =
        addLeadingZero(seconds);
    }
  }, 300);
}

/// Запуск таймера (вставте свою дату в targetDate в ./js/countdown.js")
updateCountdown();
