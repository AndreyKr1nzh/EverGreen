            // Анимация слайдера
const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideWidth = document.querySelector('.slide').offsetWidth;

let counter = 0;
function slideNext() {
    counter++;
    if (counter >= slides.children.length) {
        counter = 0;
    }

    slides.style.transform = `translateX(${-counter * slideWidth}px)`;
}

function slidePrev() {
    counter--;
    if (counter < 0) {
        counter = slides.children.length - 1;
    }

    slides.style.transform = `translateX(${-counter * slideWidth}px)`;
}

            // Анимация при скролле

document.addEventListener('DOMContentLoaded', function() {
    const elemarray = [
        ...document.querySelectorAll('.advantage-card-left, .advantage-card-right'),
        ...document.querySelectorAll('.product-card')
    ];

    function CheckElem(i) {
        const rect = i.getBoundingClientRect();
        return rect.top < window.innerHeight - 50;
    }

    function Animation() {
        elemarray.forEach(i => {
            if (CheckElem(i)) {
                i.style.opacity = '1';
                i.style.transform = 'translateY(0)';
            }
        });
    }

    elemarray.forEach(i => {
        i.style.opacity = '0';
        i.style.transform = 'translateY(20px)';
        i.style.transition = 'all 0.5s ease';
    });

    Animation();
    
    window.addEventListener('scroll', Animation);
});