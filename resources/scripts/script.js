window.onload = () => {
    var amount = localStorage.getItem('amount') || 0;

    updateDisplay();
    updateDays();

    document.getElementById('amount').value = amount;
};

var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let amount = localStorage.getItem('amount') || 0;
var today = new Date();
var month = today.getMonth() + 1;
var year = today.getFullYear();

const updateDisplay = () => {
    document.getElementById('monthName').innerText = `${months[month]}\n${year}`;
};

const turnActive = event => {
    if (event.target.tagName === 'LI' && event.target.innerHTML % 1 === 0) {
        event.target.classList.toggle('active');
    }
    updateAmount();
};

const reload = () => {
    let amount = parseInt(document.getElementById('amount').value, 10) || 0;
    const days = document.getElementsByClassName('d');

    for (let i = 0; i < days.length; i++) {
        days[i].classList.toggle('active', i < amount);
    }

    localStorage.setItem('amount', amount);
};

const nextMonth = () => {
    if (month === 12) {
        month = 1;
        year++;
    } else {
        month++;
    }
    updateDisplay();
    updateDays();
};

const prevMonth = () => {
    if (month === 1) {
        month = 12;
        year--;
    } else {
        month--;
    }
    updateDisplay();
    updateDays();
};

const updateDays = () => {
    const daysContainer = document.querySelector('.days');
    daysContainer.innerHTML = ''; 

    const firstDayOfWeek = new Date(year, month - 1, 0).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDayElement = document.createElement('li');
        emptyDayElement.textContent = '-';
        daysContainer.appendChild(emptyDayElement);
    }

    const totalDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
        const dayElement = document.createElement('li');
        dayElement.classList.add('d');
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }

    markDays(amount);
};

const updateAmount = () => {
    let amount = document.getElementsByClassName('active').length;
    
    document.getElementById('amount').value = amount;

    return amount;
};

const markDays = (amount) => {
    let days = document.getElementsByClassName('d');
    for (let i = 0; i < amount; i++) {
        days[i].classList.add('active');
    }
    console.log(amount);
};

document.addEventListener("click", turnActive);

window.addEventListener('beforeunload', () => {
    let amount = updateAmount();
    const days = document.getElementsByClassName('d');

    for (let i = 0; i < days.length; i++) {
        days[i].classList.toggle('active', i < amount);
    }
});