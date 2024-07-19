document.addEventListener('DOMContentLoaded', () => {
    const updateLanguageVisibility = () => {
        document.querySelectorAll('[data-lang]').forEach(span => {
            if (span.getAttribute('data-lang') === lang) {
                span.classList.remove('hidden'); // Show span for current language
            } else {
                span.classList.add('hidden'); // Hide spans for other languages
            }
        });
    };

    // Initial language setup
    updateLanguageVisibility();

    // Update language visibility on window resize (if needed)
    window.addEventListener('resize', updateLanguageVisibility);
});