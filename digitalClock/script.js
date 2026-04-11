const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const ampmElement = document.getElementById('ampm');
const dayNameElement = document.getElementById('dayName');
const monthElement = document.getElementById('month');
const dayNumElement = document.getElementById('dayNum');
const yearElement = document.getElementById('year');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    hoursElement.textContent = padZero(hours);
    minutesElement.textContent = padZero(minutes);
    secondsElement.textContent = padZero(seconds);
    ampmElement.textContent = ampm;

    dayNameElement.textContent = days[now.getDay()];
    monthElement.textContent = months[now.getMonth()];
    dayNumElement.textContent = padZero(now.getDate());
    yearElement.textContent = now.getFullYear();
}

// Initial call to prevent delay
updateClock();
// Update every second
setInterval(updateClock, 1000);
