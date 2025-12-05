import Portfolio from './app.js';
import ExperienceManager from './experienceManager.js';

// Initialize modules
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main Portfolio app
    Portfolio.init();
    
    // Initialize the Experience Manager
    ExperienceManager.init();
    
    // Add event listeners for global UI elements
    document.addEventListener('click', (e) => {
        // Close mobile menu when clicking outside
        if (!e.target.closest('.navbar') && 
            !e.target.classList.contains('menu-toggle')) {
            const navbar = document.querySelector('.navbar');
            if (navbar && navbar.classList.contains('responsive')) {
                navbar.classList.remove('responsive');
            }
        }
    });
});
