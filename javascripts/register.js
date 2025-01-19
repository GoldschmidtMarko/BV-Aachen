function toggleDoppelFields() {
    const doppelSelect = document.getElementById('doppel');
    const additionalDoppel = document.getElementById('additional-doppel');
    const isVisible = doppelSelect.value !== "Kein Doppel";

    toggleRequiredFields(additionalDoppel, isVisible, 'doppel_spieler_id');
    toggleVisibility(additionalDoppel, isVisible);
}

if (performance.navigation.type == 2) { // User used the back button
    window.location.reload();
}

window.onload = function() {
    document.getElementById("myForm").reset();
};

function toggleMixedFields() {
    const mixedSelect = document.getElementById('mixed');
    const additionalMixed = document.getElementById('additional-mixed');
    const isVisible = mixedSelect.value !== "Kein Mixed";

    toggleRequiredFields(additionalMixed, isVisible, 'mixed_spieler_id');
    toggleVisibility(additionalMixed, isVisible);
}

function toggleRequiredFields(container, isVisible, excludeId) {
    if (!container) return; // Ensure container exists
    const inputs = container.querySelectorAll('input, select');
    inputs.forEach((input) => {
        if (input.id === excludeId) return; // Skip the excluded input
        if (isVisible) {
            input.setAttribute('required', 'true');
        } else {
            input.removeAttribute('required');
        }
    });
}

function toggleVisibility(element, isVisible) {
    if (isVisible) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}