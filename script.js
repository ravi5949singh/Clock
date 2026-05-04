const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

const digitalClock = document.getElementById('digital-clock');
const dayDisplay = document.getElementById('day-display');
const fullDateDisplay = document.getElementById('full-date-display');

const eventForm = document.getElementById('event-form');
const eventTitle = document.getElementById('event-title');
const eventTime = document.getElementById('event-datetime');
const eventsList = document.getElementById('events-list');

const themeToggle = document.getElementById('theme-toggle');

let events = JSON.parse(localStorage.getItem('events')) || [];

/* CLOCK */
function updateClock(){
    const now = new Date();

    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

    secondHand.style.transform = `rotate(${s*6}deg)`;
    minuteHand.style.transform = `rotate(${m*6}deg)`;
    hourHand.style.transform = `rotate(${h*30 + m/2}deg)`;

    digitalClock.innerText = now.toLocaleTimeString();

    dayDisplay.innerText = now.toLocaleDateString('en-US',{weekday:'long'});
    fullDateDisplay.innerText = now.toLocaleDateString();
}
setInterval(updateClock,1000);

/* EVENTS */
eventForm.addEventListener('submit',e=>{
    e.preventDefault();

    const newEvent = {
        id: Date.now(),
        title: eventTitle.value,
        time: eventTime.value
    };

    events.push(newEvent);
    localStorage.setItem('events',JSON.stringify(events));
    renderEvents();

    eventForm.reset();
});

function renderEvents(){
    eventsList.innerHTML = '';

    events.forEach(e=>{
        const li = document.createElement('li');
        li.className = 'event-item';

        li.innerHTML = `
            <span>${e.title}</span>
            <button onclick="deleteEvent(${e.id})">❌</button>
        `;

        eventsList.appendChild(li);
    });
}

function deleteEvent(id){
    events = events.filter(e=>e.id!==id);
    localStorage.setItem('events',JSON.stringify(events));
    renderEvents();
}

/* DARK MODE */
themeToggle.onclick = ()=>{
    document.body.classList.toggle('dark-mode');
};

renderEvents();
updateClock();