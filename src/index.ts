import './styles/tailwind.css';
import { getAccessToken } from './api/spotify';

// Background processes, state management, etc.
console.log("Background service worker started");

chrome.alarms.create("refreshSpotifyData", { periodInMinutes: 0.3 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "refreshSpotifyData") {
        console.log("Refreshing Spotify data...");
        try {
            const accessToken = await getAccessToken();
            console.log("Access token after refresh:", accessToken);

            // You can add more logic here to use the access token
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
        }
    }
});

// Keep the service worker active for testing
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "keepAlive") {
        console.log("Service worker is kept alive");
        sendResponse("Service worker is alive");
    }
});

// Log the contents of Chrome's local storage
chrome.storage.local.get(null, (items) => {
    console.log("Chrome local storage contents:", items);
});