import { createPlaylist } from '../spotify';
import { artistsCarousel } from './artistsCarousel';
import { tracksCarousel } from './tracksCarousel';

// Function to create a playlist from the populated tracks
export const createPlaylistButton = async () => {
    try {
        const trackUris = Array.from(document.querySelectorAll('.swiper-container-tracks .swiper-slide'))
            .map(slide => slide.getAttribute('data-uri'))
            .filter(uri => uri !== null) as string[];

        if (trackUris.length === 0) {
            console.error('No tracks found to create a playlist');
            return;
        }

        await createPlaylist(trackUris);
        showPopup('Playlist created successfully!');
    } catch (error) {
        console.error('Error creating playlist:', error);
    }
};

const showPopup = (message: string) => {
    // Remove any existing popup
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'popup fixed top-0 inset-x-0 flex justify-center z-[9999]';

    const popupContent = document.createElement('div');
    popupContent.innerText = message;
    popupContent.className = 'text-lg font-light bg-customGreen text-customWhite px-8 py-4 rounded-lg shadow-lg animate-fade-in-out mt-4';

    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 2100);
};

// Function to update button styles
export const updateButton = (selectedButtonId: string, buttonGroup: string) => {
    const buttons = document.querySelectorAll(`#${buttonGroup} button`);
    buttons.forEach(button => {
        if (button.id === selectedButtonId) {
            button.classList.add('bg-customGreen', 'text-customWhite', 'bg-opacity-100', 'text-opacity-100', 'transition-colors', 'duration-500', 'ease-in-out');
            button.classList.remove('bg-customGrey', 'text-customWhite', 'bg-opacity-75', 'text-opacity-100');
        } else {
            button.classList.remove('bg-customGreen', 'text-customWhite', 'bg-opacity-100', 'text-opacity-100', 'transition-colors', 'duration-500', 'ease-in-out');
            button.classList.add('bg-customGrey', 'text-customWhite', 'bg-opacity-75', 'text-opacity-100');
        }
    });
};

// Function to initialize carousels and add event listeners
export const initializeCarouselsAndListeners = () => {
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
};