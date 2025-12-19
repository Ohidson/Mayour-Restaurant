// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const eventType = document.getElementById('eventType');
    const otherEvent = document.getElementById('otherEvent');
    const confirmation = document.getElementById('confirmation');

    // Show/hide other event input
    eventType.addEventListener('change', () => {
        if (eventType.value === 'other') {
            otherEvent.style.display = 'block';
            otherEvent.required = true;
        } else {
            otherEvent.style.display = 'none';
            otherEvent.required = false;
        }
    });

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation (though HTML5 required handles most)
        if (form.checkValidity()) {
            // Simulate submission (in real scenario, send to server)
            console.log('Form submitted:', new FormData(form));
            
            form.style.display = 'none';
            confirmation.style.display = 'block';
        }
    });
});