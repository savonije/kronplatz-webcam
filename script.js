async function fetchWeather() {
    try {
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=46.73&longitude=11.95&current=temperature_2m,wind_speed_10m'
        );
        const data = await response.json();
        const temp = data.current.temperature_2m;
        const windSpeed = data.current.wind_speed_10m;

        document.querySelector('.temp').innerHTML = `${temp}°C`;
        document.querySelector('.wind').innerHTML = `${windSpeed} km/h`;
    } catch (error) {
        document.querySelector('.weather').innerHTML =
            'Fout bij het laden van weergegevens.';
    }
}

setTimeout(function () {
    location.reload();
}, 275000); // 5 minutes in milliseconds

function updateCountdown() {
    const targetDate = new Date('March 21, 2025 15:00:00 GMT+0100').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) {
        document.querySelector('.countdown').innerHTML = 'Aftellen tot 2026...';
        return;
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    document.querySelector(
        '.countdown-days'
    ).innerHTML = `${days} <span class="small">dagen</span>`;
    document.querySelector(
        '.countdown-hours'
    ).innerHTML = `${hours} <span class="small">uren</span>`;
    document.querySelector(
        '.countdown-minutes'
    ).innerHTML = `${minutes} <span class="small">minuten</span>`;
    document.querySelector(
        '.countdown-seconds'
    ).innerHTML = `${seconds} <span class="small">seconden</span>`;
}

setInterval(updateCountdown, 1000);
window.onload = function () {
    updateCountdown();
    fetchWeather();

    const header = document.querySelector('header');
    if (Math.random() < 0.5) {
        header.classList.add('reverse');
    }

    const video = document.querySelector('.splash-screen video');
    video.addEventListener('ended', () => {
        document.querySelector('.splash-screen').style.display = 'none';
    });
};
