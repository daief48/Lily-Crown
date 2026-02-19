/**
 * Lily Crown Admin - Theme Toggle Persistence
 * Handles switching between Royal Light and Royal Dark modes.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('royal-theme-toggle');
    if (!themeToggle) return;

    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('lily-crown-theme') || 'light';

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();

        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

        // Save preference
        localStorage.setItem('lily-crown-theme', isDark ? 'dark' : 'light');

        // Update icon
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        // Optional: Smooth transition ripple or effect can be added here
    });
});
