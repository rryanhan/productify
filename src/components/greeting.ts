const greeting = document.getElementById('greeting');

export const callGreeting = () => {
    // Retrieve user profile from local storage
    chrome.storage.local.get(['userProfile'], (result) => {
        const userProfile = result.userProfile;

        // Get the current hour to determine the time of day
        const currentHour = new Date().getHours();
        let timeOfDay = '';

        if (currentHour < 12) {
            timeOfDay = 'Good morning';
        } else if (currentHour < 18) {
            timeOfDay = 'Good afternoon';
        } else {
            timeOfDay = 'Good evening';
        }

        // Set the greeting message with username and time of day
        if (greeting) {
            const userName = userProfile ? userProfile.display_name : ''; 
            greeting.innerHTML = `${timeOfDay}, <span class="text-customGreen">${userName}</span>`;
        } else {
            console.error('Greeting element not found');
        }
    });
};