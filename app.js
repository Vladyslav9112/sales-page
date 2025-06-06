function startEndOfDayTimer() {
  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const remainingTime = Math.floor((endOfDay - now) / 1000);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    document.getElementById("hours-tens").textContent = Math.floor(hours / 10);
    document.getElementById("hours-units").textContent = hours % 10;

    document.getElementById("minutes-tens").textContent = Math.floor(
      minutes / 10
    );
    document.getElementById("minutes-units").textContent = minutes % 10;

    document.getElementById("seconds-tens").textContent = Math.floor(
      seconds / 10
    );
    document.getElementById("seconds-units").textContent = seconds % 10;
  }

  setInterval(updateTimer, 1000);
  updateTimer();
}

startEndOfDayTimer();

document.querySelectorAll(".scrollToOrder").forEach((element) => {
  element.addEventListener("click", function () {
    const targetElement = document.getElementById("order");
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const closeWidget = document.getElementById("closeWidget");

closeWidget.addEventListener("click", function () {
  const widget = document.getElementById("widget");
  widget.style.display = "none";
});

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_term",
  "utm_content",
  "utm_campaign",
];

function getUTMParamsFromURL() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      result[key] = value;
      localStorage.setItem(key, value);
    }
  });
  return result;
}

function getUTMParamsFromStorage() {
  const result = {};
  UTM_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value) {
      result[key] = value;
    }
  });
  return result;
}

function setHiddenFieldsFromUTM(form, utmData) {
  if (!form) return;
  const s1 = form.querySelector(".price_filed_s1");
  const s2 = form.querySelector(".price_filed_s2");
  const s3 = form.querySelector(".price_filed_s3");

  if (s1) s1.value = utmData.utm_source || "";
  if (s2) s2.value = utmData.utm_campaign || "";
  if (s3) s3.value = utmData.utm_medium || "";
}

document.addEventListener("DOMContentLoaded", () => {
  const urlUTM = getUTMParamsFromURL();
  const storedUTM = getUTMParamsFromStorage();
  const utm = { ...storedUTM, ...urlUTM };

  const form = document.querySelector("#order");
  setHiddenFieldsFromUTM(form, utm);
});
