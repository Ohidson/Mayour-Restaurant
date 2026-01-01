// Simple JavaScript for potential interactivity (e.g., smooth scroll or future enhancements)

document.addEventListener('DOMContentLoaded', () => {
    console.log('Mayour Restaurant About Page Loaded');

    // Example: Smooth scroll for anchor links (if added later)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Placeholder for future features like image gallery or animations
});