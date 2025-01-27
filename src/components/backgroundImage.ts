import '../styles/tailwind.css';

// BACKGROUND IMAGE
// TODO: Allow functionality to change background
// Set default background image if not already set
const defaultBackgroundImage = 'assets/images/def-backdrop.jpg'; 
console.log('Using background image:', defaultBackgroundImage);

const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
};

export const setBackgroundImage = () => {
    preloadImage(defaultBackgroundImage);
    chrome.storage.local.get(['backgroundImage'], (result) => {
        const backgroundImage = result.backgroundImage || defaultBackgroundImage;
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover'; 
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center'; 
        document.body.style.height = '100vh';
        chrome.storage.local.set({ backgroundImage });
    });
};

