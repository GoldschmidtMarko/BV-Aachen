function toggleDoppelFields() {
    var selectValue = document.getElementById('doppel').value;
    var additionalFields = document.getElementById('additional-doppel');

    // Show or hide additional fields based on the selected value
    if (selectValue !== "Kein Doppel") {
        additionalFields.classList.remove('hidden');
    } else {
        additionalFields.classList.add('hidden');
    }
}

function toggleMixedFields() {
    var selectValue = document.getElementById('mixed').value;
    var additionalFields = document.getElementById('additional-mixed');

    // Show or hide additional fields based on the selected value
    if (selectValue !== "Kein Mixed") {
        additionalFields.classList.remove('hidden');
    } else {
        additionalFields.classList.add('hidden');
    }
}