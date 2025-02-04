import '../styles/tailwind.css';

import { setBackgroundImage } from '../components/backgroundImage';
import { updateClock } from '../components/clock';
import { updateUserProfile } from '../components/loginButton';
import { callGreeting } from '../components/greeting';
import { initSwiper } from '../swiper/swiper-init';
import { tracksCarousel } from '../components/tracksCarousel';
import { artistsCarousel } from '../components/artistsCarousel';
import { createPlaylistButton, updateButton } from '../components/carouselButtons';

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

const config = {
    allTimeArtistIDs: [], // Populate with actual data
    allTimeTrackIDs: [],  // Populate with actual data
    currentArtistIDs: [], // Populate with actual data
    currentTrackIDs: [],  // Populate with actual data
    country: 'US'         // Populate with actual data
};

// Initialize the carousels with the default time range - short_term
artistsCarousel("short_term");
updateButton("shortTermArtistsBtn", "artistsButtonGroup");

tracksCarousel("short_term");
updateButton("shortTermTracksBtn", "tracksButtonGroup");

let selectedTimeRange: "short_term" | "medium_term" | "long_term" = "short_term";

// Add event listener to the create playlist button
document.getElementById("createPlaylistBtn")?.addEventListener("click", createPlaylistButton);

// Add event listeners to the artist buttons
document.getElementById("shortTermArtistsBtn")?.addEventListener("click", () => {
    artistsCarousel("short_term");
    updateButton("shortTermArtistsBtn", "artistsButtonGroup");
});
document.getElementById("mediumTermArtistsBtn")?.addEventListener("click", () => {
    artistsCarousel("medium_term");
    updateButton("mediumTermArtistsBtn", "artistsButtonGroup");
});
document.getElementById("longTermArtistsBtn")?.addEventListener("click", () => {
    artistsCarousel("long_term");
    updateButton("longTermArtistsBtn", "artistsButtonGroup");
});

// Add event listeners to the track buttons
document.getElementById("shortTermTracksBtn")?.addEventListener("click", () => {
    selectedTimeRange = "short_term";
    tracksCarousel(selectedTimeRange);
    updateButton("shortTermTracksBtn", "tracksButtonGroup");
});
document.getElementById("mediumTermTracksBtn")?.addEventListener("click", () => {
    selectedTimeRange = "medium_term";
    tracksCarousel(selectedTimeRange);
    updateButton("mediumTermTracksBtn", "tracksButtonGroup");
});
document.getElementById("longTermTracksBtn")?.addEventListener("click", () => {
    selectedTimeRange = "long_term";
    tracksCarousel(selectedTimeRange);
    updateButton("longTermTracksBtn", "tracksButtonGroup");
});

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