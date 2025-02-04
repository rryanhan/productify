// src/components/loginButton.ts
import { login, logout } from '../spotify';

let profilePic: HTMLImageElement;
let username: HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
    profilePic = document.getElementById('profilePic') as HTMLImageElement;
    username = document.getElementById('username') as HTMLElement;

    // Initialize user profile
    updateUserProfile();
});

// Function to update user profile button based on chrome local storage
export const updateUserProfile = async () => {
    const cachedProfile = await chrome.storage.local.get(['userProfile']);
    
    if (cachedProfile.userProfile) {
        // If user is logged in, set profile picture and username to spotify information
        profilePic.src = cachedProfile.userProfile.images[0]?.url;
        username.textContent = cachedProfile.userProfile.display_name;
        
        // Remove click event listener if user is logged in
        profilePic.removeEventListener('click', handleLoginClick);
        
    } else {
        // User is not logged in
        profilePic.src = 'assets/icons/default-pfp.jpeg';
        username.textContent = '';

        // Remove any existing event listener to avoid duplicates
        profilePic.removeEventListener('click', handleLoginClick);

        // Add click event listener to initiate login
        profilePic.addEventListener('click', handleLoginClick);
    }
};

// Function to handle login click
export const handleLoginClick = async () => {
    // profilePic.src = 'assets/icons/loading-spinner.gif'; ADD THIS IN LATER

    const { loggedIn, userProfile } = await login(); // Recieve login status and user profile
    if (loggedIn) {
        // Add user profile to chrome storage after login
        await chrome.storage.local.set({ userProfile });
        
        // Update the user profile display
        updateUserProfile();
        window.location.reload(); 
    } else {
        console.error('Login failed'); 
        profilePic.src = 'assets/icons/default-pfp.jpeg'; // Reset to default profile picture
    }
};

export const signoutButton = async() => {
    const logoutButton = document.getElementById('signOut')
    logoutButton?.addEventListener('click', async () => {
        await logout();
        updateUserProfile();
        window.location.reload();
    });
}