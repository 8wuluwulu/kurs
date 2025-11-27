const scrollBtn = document.getElementById('scrollBtn');
const contactForm = document.getElementById('contactForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const track = document.querySelector('.carousel-track');
let cards = document.querySelectorAll('.trainer-card');

let currentIndex = 0;
const totalCards = 4;

function cloneCards() {
    const allCards = Array.from(document.querySelectorAll('.trainer-card'));
    allCards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    cards = document.querySelectorAll('.trainer-card');
}

function updateCarousel(smooth = true) {
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const offset = -currentIndex * (cardWidth + gap);
    
    if (smooth) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, i) => {
        card.classList.toggle('active', i % totalCards === currentIndex % totalCards);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex % totalCards);
    });
}

function nextSlide() {
    currentIndex++;
    updateCarousel(true);
    
    if (currentIndex >= totalCards) {
        setTimeout(() => {
            currentIndex = 0;
            updateCarousel(false);
        }, 500);
    }
}

function prevSlide() {
    if (currentIndex <= 0) {
        currentIndex = totalCards;
        updateCarousel(false);
    }
    currentIndex--;
    updateCarousel(true);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateCarousel(true);
    });
});

scrollBtn.addEventListener('click', () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input');
    const formData = {
        name: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value
    };
    console.log('Форма отправлена:', formData);
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
});

window.addEventListener('load', () => {
    cloneCards();
    updateCarousel(false);
});

window.addEventListener('resize', () => {
    updateCarousel(false);
});
