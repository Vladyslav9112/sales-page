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

    // Розділяємо числа на десятки й одиниці
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




