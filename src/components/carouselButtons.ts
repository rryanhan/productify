import { createPlaylist } from '../api/spotify';

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
            button.classList.add('bg-customGreen', 'text-customWhite', 'bg-opacity-75', 'text-opacity-75', 'transition-colors', 'duration-500', 'ease-in-out');
            button.classList.remove('bg-customGrey', 'text-customWhite', 'bg-opacity-40', 'text-opacity-75');
        } else {
            button.classList.remove('bg-customGreen', 'text-customWhite', 'bg-opacity-75', 'text-opacity-75', 'transition-colors', 'duration-500', 'ease-in-out');
            button.classList.add('bg-customGrey', 'text-customWhite', 'bg-opacity-40', 'text-opacity-75');
        }
    });
};