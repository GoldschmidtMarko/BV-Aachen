function showhideNavigation(ids) {
    ids.forEach(id => {
        var e = document.getElementById(id);
        if (e) {
            e.style.display = (e.style.display === 'none') ? 'block' : 'none';
        }
    });
}

window.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 768) {
        var e = document.getElementById('navigation');
        if (e.style.display === 'block') {
            showhideNavigation(['navigation', 'languageToggle']);
        }
    }
});
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        var e = document.getElementById('navigation');
        if (e.style.display === 'none') {
            showhideNavigation(['navigation', 'languageToggle']);
        }
    }
    if (window.innerWidth < 768) {
        var e = document.getElementById('navigation');
        if (e.style.display === 'block') {
            showhideNavigation(['navigation', 'languageToggle']);
        }
    }
});