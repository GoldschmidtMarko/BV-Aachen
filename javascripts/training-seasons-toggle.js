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
    const month = today.getMonth(); // 0: January, 1: February, ..., 11: December

    const columnsMonday1 = document.querySelectorAll('[data-column="monday1"]');
    const columnsMonday2 = document.querySelectorAll('[data-column="monday2"]');

    const setSummer = () => {
        columnsMonday1.forEach(element => element.style.display = 'none');
        columnsMonday2.forEach(element => element.style.display = 'block');
        document.getElementById('seasonInfo_Ger').textContent = 'Von 01.04 bis 30.09';
        document.getElementById('seasonInfo_Eng').textContent = 'From 01.04 to 30.09';
        updateSeasonInfoColor(); // Update color based on current date
    };

    const setWinter = () => {
        columnsMonday1.forEach(element => element.style.display = 'block');
        columnsMonday2.forEach(element => element.style.display = 'none');
        document.getElementById('seasonInfo_Ger').textContent = 'Von 01.10 bis 31.03';
        document.getElementById('seasonInfo_Eng').textContent = 'From 01.10 to 31.03';
        updateSeasonInfoColor(); // Update color based on current date
    };

    document.getElementById('summerButton').addEventListener('click', () => {
        setSummer();
        document.getElementById('summerButton').classList.add('active');
        document.getElementById('winterButton').classList.remove('active');
    });

    document.getElementById('winterButton').addEventListener('click', () => {
        setWinter();
        document.getElementById('winterButton').classList.add('active');
        document.getElementById('summerButton').classList.remove('active');
    });

    // Initial setup based on current month
    if (month >= 3 && month <= 8) { // April (3) to September (8)
        setSummer();
        document.getElementById('summerButton').classList.add('active');
        document.getElementById('winterButton').classList.remove('active');
    } else {
        setWinter();
        document.getElementById('winterButton').classList.add('active');
        document.getElementById('summerButton').classList.remove('active');
    }
});