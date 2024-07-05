// language-toggle.js

async function initializeDB() {
    const db = await idb.openDB('chipsDB', 1, {
        upgrade(db) {
            db.createObjectStore('store');
        }
    });
    return db;
}

// Function to set a value in IndexedDB
async function setChips(key, value) {
    try {
        const db = await initializeDB();
        const tx = db.transaction('store', 'readwrite');
        await tx.store.put(value, key);
        await tx.done;
        console.log(`Chips set: ${key}=${value}`);
    } catch (error) {
        console.error('Error setting chips:', error);
    }
}

// Function to get a value from IndexedDB
async function getChips(key) {
    try {
        const db = await initializeDB();
        const value = await db.get('store', key);
        console.log(`Chips retrieved: ${key}=${value}`);
        return value;
    } catch (error) {
        console.error('Error retrieving chips:', error);
        return null;
    }
}

// Example usage
async function exampleUsage() {
    await setChips('language', 'en');
    const retrievedValue = await getChips('language');
    console.log('Retrieved value:', retrievedValue);
}



document.addEventListener('DOMContentLoaded', async() => {
    const languageToggle = document.getElementById('languageToggle');
    const languageIcon = document.getElementById('languageIcon');
    const navLinks = document.querySelectorAll('#navigation a');
    const mainContentEn = document.querySelectorAll('[data-lang="en"]');
    const mainContentDe = document.querySelectorAll('[data-lang="de"]');

    // Function to toggle between English and German
    const toggleLanguage = async() => {
        //    const currentLanguage = localStorage.getItem('language') || 'en';
        const currentLanguage = await getChips('language') || 'en';
        console.log(`Current language from chips: ${currentLanguage}`);

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
        // localStorage.setItem('language', currentLanguage);
        await setChips('language', currentLanguage);
    };

    // Initialize language toggle based on stored language preference
    await toggleLanguage();

    // Add click event listener to language toggle button
    languageToggle.addEventListener('click', async() => {
        // const currentLanguage = localStorage.getItem('language') || 'en';
        // localStorage.setItem('language', currentLanguage === 'en' ? 'de' : 'en');
        const currentLanguage = await getChips('language') || 'en';
        await setChips('language', currentLanguage === 'en' ? 'de' : 'en');
        await toggleLanguage();
    });
});