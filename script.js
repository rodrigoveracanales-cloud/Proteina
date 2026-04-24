// Initialize Lucide Icons
lucide.createIcons();

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
            
            // If it's a nutrition info section, trigger the bars
            const progressBars = reveal.querySelectorAll('.stat-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Header background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.background = 'rgba(10, 10, 10, 0.8)';
    } else {
        header.style.padding = '1rem 0';
        header.style.background = 'var(--glass)';
    }
});

// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Checkout Logic
const modal = document.getElementById('checkoutModal');
const closeBtn = document.getElementById('closeModal');
const buyBtns = document.querySelectorAll('.buy-btn');
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const qtySpan = document.getElementById('qty');
const subtotalSpan = document.getElementById('subtotal');
const totalSpan = document.getElementById('total');
const payBtn = document.getElementById('payBtn');
const spinner = document.getElementById('spinner');

const PRICE = 59.99;
let quantity = 1;

const updatePrices = () => {
    const total = (quantity * PRICE).toFixed(2);
    qtySpan.innerText = quantity;
    subtotalSpan.innerText = `$${total}`;
    totalSpan.innerText = `$${total}`;
};

buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

plusBtn.addEventListener('click', () => {
    quantity++;
    updatePrices();
});

minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        updatePrices();
    }
});

payBtn.addEventListener('click', () => {
    payBtn.style.display = 'none';
    spinner.style.display = 'block';
    
    // Simulate redirection to Stripe
    setTimeout(() => {
        alert('En un entorno real, aquí serías redirigido a Stripe Checkout.\nTotal a pagar: $' + (quantity * PRICE).toFixed(2));
        modal.classList.remove('active');
        payBtn.style.display = 'block';
        spinner.style.display = 'none';
    }, 2000);
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});
