document.addEventListener('DOMContentLoaded', () => {
    // Установите дату и время открытия
    // Формат: "Месяц День, Год Часы:Минуты:Секунды"
    // Пример: "Dec 31, 2024 23:59:59"
    // Или используйте объект Date для конкретной даты и времени
    const launchDate = new Date("December 31, 2024 23:59:59").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        // Расчет времени для дней, часов, минут и секунд
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Обновление элементов на странице
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

        // Если отсчет закончился
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Мы открыты!";
            document.getElementById("countdown").style.fontSize = "1.5em";
            document.getElementById("countdown").style.color = "#28a745";
        }
    }, 1000);
});