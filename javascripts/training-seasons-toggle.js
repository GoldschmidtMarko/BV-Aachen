// Function to update the color of the season info elements
const updateSeasonInfoColor = () => {
    const seasonInfoGer = document.getElementById('seasonInfo_Ger');
    const seasonInfoEng = document.getElementById('seasonInfo_Eng');
    const today = new Date();

    // Define the dates for October 1st and April 1st
    const octoberFirst = new Date(today.getFullYear(), 9, 1); // October 1st
    const aprilFirst = new Date(today.getFullYear(), 3, 1); // April 1st

    // Define one month before these dates
    const oneMonthBeforeOctober = new Date(octoberFirst);
    oneMonthBeforeOctober.setMonth(octoberFirst.getMonth() - 1);

    const oneMonthBeforeApril = new Date(aprilFirst);
    oneMonthBeforeApril.setMonth(aprilFirst.getMonth() - 1);

    // Check if today is in the one-month-before range
    if ((today >= oneMonthBeforeOctober && today < octoberFirst) ||
        (today >= oneMonthBeforeApril && today < aprilFirst)) {
        seasonInfoGer.style.color = 'red';
        seasonInfoEng.style.color = 'red';
    } else {
        seasonInfoGer.style.color = ''; // Reset color
        seasonInfoEng.style.color = ''; // Reset color
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const month = today.getMonth(); // 0: January to 11: December

    const setupSeasonToggle = (suffix) => {
        const columnsMonday1 = document.querySelectorAll(`[data-column="monday1-${suffix}"]`);
        const columnsMonday2 = document.querySelectorAll(`[data-column="monday2-${suffix}"]`);

        const columnsThursday1 = document.querySelectorAll(`[data-column="thursday1-${suffix}"]`);
        const columnsThursday2 = document.querySelectorAll(`[data-column="thursday2-${suffix}"]`);

        const setSummer = () => {
            columnsMonday1.forEach(element => element.style.display = 'none');
            columnsThursday1.forEach(element => element.style.display = 'none');
            columnsMonday2.forEach(element => element.style.display = 'block');
            columnsThursday2.forEach(element => element.style.display = 'block');
            document.getElementById(`seasonInfo_Ger-${suffix}`).textContent = 'Von 01.04 bis 30.09';
            document.getElementById(`seasonInfo_Eng-${suffix}`).textContent = 'From 01.04 to 30.09';
        };

        const setWinter = () => {
            columnsMonday1.forEach(element => element.style.display = 'block');
            columnsThursday1.forEach(element => element.style.display = 'block');
            columnsMonday2.forEach(element => element.style.display = 'none');
            columnsThursday2.forEach(element => element.style.display = 'none');
            document.getElementById(`seasonInfo_Ger-${suffix}`).textContent = 'Von 01.10 bis 31.03';
            document.getElementById(`seasonInfo_Eng-${suffix}`).textContent = 'From 01.10 to 31.03';
        };
 
        document.getElementById(`summerButton-${suffix}`).addEventListener('click', () => {
            setSummer();
            document.getElementById(`summerButton-${suffix}`).classList.add('active');
            document.getElementById(`winterButton-${suffix}`).classList.remove('active');
        });

        document.getElementById(`winterButton-${suffix}`).addEventListener('click', () => {
            setWinter();
            document.getElementById(`winterButton-${suffix}`).classList.add('active');
            document.getElementById(`summerButton-${suffix}`).classList.remove('active');
        });

        // Initial setup based on current month
        if (month >= 3 && month <= 8) {
            setSummer();
            document.getElementById(`summerButton-${suffix}`).classList.add('active');
            document.getElementById(`winterButton-${suffix}`).classList.remove('active');
        } else {
            setWinter();
            document.getElementById(`winterButton-${suffix}`).classList.add('active');
            document.getElementById(`summerButton-${suffix}`).classList.remove('active');
        }
    };

    // Initialize for both suffixes
    setupSeasonToggle('senior');
    setupSeasonToggle('kids');
});




function selectTab(tab) {
    const seniorTab = document.getElementById('tab-senior');
    const kidsTab = document.getElementById('tab-kids');
    const seniorContent = document.getElementById('content-senior');
    const kidsContent = document.getElementById('content-kids');
    seniorTab.classList.remove('underline', 'font-bold', 'border-blue-500');
    kidsTab.classList.remove('underline', 'font-bold', 'border-blue-500');

    if (tab === 'senior') {
        seniorContent.classList.remove('hidden');
        kidsContent.classList.add('hidden');
        seniorTab.classList.add('border-blue-500', 'font-bold');
        kidsTab.classList.remove('border-blue-500', 'font-bold');
        seniorTab.classList.add('underline', 'font-bold', 'border-blue-500');
    } else {
        kidsContent.classList.remove('hidden');
        seniorContent.classList.add('hidden');
        kidsTab.classList.add('border-blue-500', 'font-bold');
        seniorTab.classList.remove('border-blue-500', 'font-bold');
        kidsTab.classList.add('underline', 'font-bold', 'border-blue-500');
    }
}
