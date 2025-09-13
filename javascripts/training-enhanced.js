// Training Season Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const month = today.getMonth(); // 0: January, 1: February, ..., 11: December

    const columnsMonday1 = document.querySelectorAll('[data-column="monday1"]');
    const columnsMonday2 = document.querySelectorAll('[data-column="monday2"]');

    const setSummer = () => {
        columnsMonday1.forEach(element => {
            element.style.display = 'none';
            element.classList.add('season-hidden');
        });
        columnsMonday2.forEach(element => {
            element.style.display = 'flex'; // Use flex for the new layout
            element.classList.remove('season-hidden');
        });
        
        // Update season info text
        const seasonInfoGer = document.getElementById('seasonInfo_Ger');
        const seasonInfoEng = document.getElementById('seasonInfo_Eng');
        if (seasonInfoGer) seasonInfoGer.textContent = 'Von 01.04 bis 30.09';
        if (seasonInfoEng) seasonInfoEng.textContent = 'From 01.04 to 30.09';
    };

    const setWinter = () => {
        columnsMonday1.forEach(element => {
            element.style.display = 'flex'; // Use flex for the new layout
            element.classList.remove('season-hidden');
        });
        columnsMonday2.forEach(element => {
            element.style.display = 'none';
            element.classList.add('season-hidden');
        });
        
        // Update season info text
        const seasonInfoGer = document.getElementById('seasonInfo_Ger');
        const seasonInfoEng = document.getElementById('seasonInfo_Eng');
        if (seasonInfoGer) seasonInfoGer.textContent = 'Von 01.10 bis 31.03';
        if (seasonInfoEng) seasonInfoEng.textContent = 'From 01.10 to 31.03';
    };

    // Add smooth transition effects
    const addTransitionEffects = () => {
        [...columnsMonday1, ...columnsMonday2].forEach(element => {
            element.style.transition = 'all 0.3s ease-in-out';
        });
    };

    // Button event listeners with enhanced feedback
    const summerButton = document.getElementById('summerButton');
    const winterButton = document.getElementById('winterButton');

    if (summerButton) {
        summerButton.addEventListener('click', () => {
            setSummer();
            summerButton.classList.add('active');
            winterButton.classList.remove('active');
            
            // Add ripple effect
            summerButton.classList.add('clicked');
            setTimeout(() => summerButton.classList.remove('clicked'), 200);
        });
    }

    if (winterButton) {
        winterButton.addEventListener('click', () => {
            setWinter();
            winterButton.classList.add('active');
            summerButton.classList.remove('active');
            
            // Add ripple effect
            winterButton.classList.add('clicked');
            setTimeout(() => winterButton.classList.remove('clicked'), 200);
        });
    }

    // Initialize transitions
    addTransitionEffects();

    // Initial setup based on current month with smooth animation
    setTimeout(() => {
        if (month >= 3 && month <= 8) { // April (3) to September (8)
            setSummer();
            if (summerButton) summerButton.classList.add('active');
            if (winterButton) winterButton.classList.remove('active');
        } else {
            setWinter();
            if (winterButton) winterButton.classList.add('active');
            if (summerButton) summerButton.classList.remove('active');
        }
    }, 100);
});