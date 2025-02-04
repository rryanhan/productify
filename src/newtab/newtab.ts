import '../styles/tailwind.css';

import { setBackgroundImage } from '../components/backgroundImage';
import { updateClock } from '../components/clock';
import { updateUserProfile, signoutButton } from '../components/loginButton';
import { callGreeting } from '../components/greeting';
import { initSwiper } from '../swiper/swiper-init';
import { initializeCarouselsAndListeners } from '../components/carouselButtons';

// BACKGROUND IMAGE
setBackgroundImage();

// CLOCK FUNCTIONALITY
setInterval(updateClock, 1000);
updateClock();

// LOGIN BUTTON FUNCTIONALITY
updateUserProfile();

// GREETING FUNCTIONALITY
callGreeting();

// SWIPER FUNCTIONALITY FOR BETWEEN WINDOWS
initSwiper();

// Initialize carousels and add event listeners
initializeCarouselsAndListeners();

// Show/hide profile dropdown
const profileContainer = document.getElementById('profileContainer');
const profileDropdown = document.getElementById('profileDropdown');

profileContainer?.addEventListener('click', () => {
    profileDropdown?.classList.toggle('hidden');
});

// Redirect to Spotify profile
document.getElementById('viewProfile')?.addEventListener('click', async () => {
    const { userProfile } = await chrome.storage.local.get(['userProfile']);
    if (userProfile) {
        window.open(userProfile.external_urls.spotify, '_blank');
    }
});

signoutButton();