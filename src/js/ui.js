// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute('href')
    );

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hero button
const heroButton = document.querySelector('.hero-button');

heroButton?.addEventListener('click', () => {
  document.getElementById('craftsmanship')?.scrollIntoView({
    behavior: 'smooth'
  });
});