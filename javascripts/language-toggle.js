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

// Function to set a cookie with SameSite=None and Secure attributes
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
}

// Function to get a cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
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

// Initialize language toggle
document.addEventListener('<script src="javascripts/navigation-menu-showhide.js"></script>', async() => {
    const languageToggle = document.getElementById('languageToggle');
    const languageIcon = document.getElementById('languageIcon');
    const navLinks = document.querySelectorAll('#navigation a');
    const mainContentEn = document.querySelectorAll('[data-lang="en"]');
    const mainContentDe = document.querySelectorAll('[data-lang="de"]');

    // Function to toggle between English and German
    const toggleLanguage = async() => {
        let currentLanguage;
        if (window.indexedDB && /Chrome|Edge/.test(navigator.userAgent)) {
            // Use CHIPS for Chrome and Edge
            currentLanguage = await getChips('language') || 'en';
        } else {
            // Use cookies for Firefox and fallback
            currentLanguage = getCookie('language') || 'en';
        }

        if (currentLanguage === 'en') {
            languageIcon.textContent = 'DE';
            mainContentEn.forEach(el => el.classList.add('hidden'));
            mainContentDe.forEach(el => el.classList.remove('hidden'));
        } else {
            languageIcon.textContent = 'EN';
            mainContentEn.forEach(el => el.classList.remove('hidden'));
            mainContentDe.forEach(el => el.classList.add('hidden'));
        }

        // Save language preference
        if (window.indexedDB && /Chrome|Edge/.test(navigator.userAgent)) {
            await setChips('language', currentLanguage);
        } else {
            setCookie('language', currentLanguage, 30);
        }
    };

    // Initialize language toggle based on stored language preference
    await toggleLanguage();

    // Add click event listener to language toggle button
    languageToggle.addEventListener('click', async() => {
        let currentLanguage;
        if (window.indexedDB && /Chrome|Edge/.test(navigator.userAgent)) {
            currentLanguage = await getChips('language') || 'en';
            await setChips('language', currentLanguage === 'en' ? 'de' : 'en');
        } else {
            currentLanguage = getCookie('language') || 'en';
            setCookie('language', currentLanguage === 'en' ? 'de' : 'en', 30);
        }
        await toggleLanguage();
    });
});