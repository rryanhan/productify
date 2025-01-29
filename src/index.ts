import './styles/tailwind.css';
import { getAccessToken } from './api/spotify';
import { getTopTracks, getTopArtists } from './api/spotify';

// Background processes, state management, etc.
console.log("Background service worker started");

chrome.alarms.create("refreshSpotifyData", { periodInMinutes: 30 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "refreshSpotifyData") {
        console.log("Refreshing Spotify data...");
        try {
            const accessToken = await getAccessToken();
            console.log("Access token after refresh:", accessToken);

            await getTopTracks("short_term");
            console.log("Fetched short term tracks");

            await getTopTracks("medium_term");
            console.log("Fetched medium term tracks");

            await getTopTracks("long_term");
            console.log("Fetched long term tracks");

            await getTopArtists("short_term");
            console.log("Fetched short term artists");

            await getTopArtists("medium_term");
            console.log("Fetched medium term artists");

            await getTopArtists("long_term");
            console.log("Fetched long term artists");


        } catch (error) {
            console.error("Error fetching Spotify data:", error);
        }
    }
});


