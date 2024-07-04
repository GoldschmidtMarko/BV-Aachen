// language-toggle.js

document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    const languageIcon = document.getElementById('languageIcon');
    const navLinks = document.querySelectorAll('#navigation a');
    const mainContentEn = document.querySelectorAll('[data-lang="en"]');
    const mainContentDe = document.querySelectorAll('[data-lang="de"]');

    // Function to toggle between English and German
    const toggleLanguage = () => {
        const currentLanguage = localStorage.getItem('language') || 'en';

        if (currentLanguage === 'en') {
            languageIcon.textContent = 'DE';
            mainContentEn.forEach(el => el.classList.add('hidden'));
            mainContentDe.forEach(el => el.classList.remove('hidden'));
        } else {
            languageIcon.textContent = 'EN';
            mainContentEn.forEach(el => el.classList.remove('hidden'));
            mainContentDe.forEach(el => el.classList.add('hidden'));
        }

        // Save language preference to localStorage
        localStorage.setItem('language', currentLanguage);
    };

    // Initialize language toggle based on stored language preference
    toggleLanguage();

    // Add click event listener to language toggle button
    languageToggle.addEventListener('click', () => {
        const currentLanguage = localStorage.getItem('language') || 'en';
        localStorage.setItem('language', currentLanguage === 'en' ? 'de' : 'en');
        toggleLanguage();
    });
});