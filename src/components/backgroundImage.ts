import '../styles/tailwind.css';

// BACKGROUND IMAGE
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

export const handleBackgroundImageUpload = () => {
    const input = document.getElementById('backgroundImageInput') as HTMLInputElement;
    input.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                chrome.storage.local.set({ backgroundImage: result }, () => {
                    setBackgroundImage();
                });
            };
            reader.readAsDataURL(file);
        }
    });
};

