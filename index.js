function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
const slides = [
    {
        image: "https://static.wikia.nocookie.net/gbp/images/9/9e/RP9.png",
        text: "дешевый регим всего лишь за 149 рб"
    },
    {
        image: "https://static.wikia.nocookie.net/gbp/images/1/1e/Regiment_Pack_1.png",
        text: "целых 3 полка разве не чудо?"
    },
    {
        image: "https://static.wikia.nocookie.net/gbp/images/8/86/RP3.png",
        text: "ну пж"
    }
];
let currentSlide = 0;
function showSlide(index) {
    const img = document.querySelector(".slider-image");
    const txt = document.querySelector(".slider-text");
    img.style.opacity = 0;
    txt.style.opacity = 0;
    setTimeout(() => {
        img.src = slides[index].image;
        txt.textContent = slides[index].text;
        img.style.opacity = 1;
        txt.style.opacity = 1;
    }, 400);
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
setInterval(nextSlide, 5000);

function startCountdown(durationSeconds) {
    let remaining = durationSeconds;

    const countdownEl = document.getElementById("countdown");

    function updateTimer() {
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        countdownEl.textContent =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (remaining > 0) {
            remaining--;
        } else {
            clearInterval(timerInterval);
        }
    }

    updateTimer(); 
    const timerInterval = setInterval(updateTimer, 1000);
}
startCountdown(24 * 3600);