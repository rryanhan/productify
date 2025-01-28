
// Tries pulling access token from chrome storage; will indicate logged in and return user profile if token exists, else will indicate logged out
// Function to get the access token from Chrome storage
export const getAccessToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
        chrome.storage.local.get(['access_token'], (result) => {
            const accessToken = result.access_token || null;
            resolve(accessToken);
        });
    });
};

// Function to fetch user profile using the access token
export const fetchUserProfile = async (): Promise<{ loggedIn: boolean; userProfile: any }> => {
    const accessToken = await getAccessToken(); // Get the access token

    if (accessToken) {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const userProfile = await response.json();
            console.log('User profile:', userProfile);
            return { loggedIn: true, userProfile };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return { loggedIn: false, userProfile: null };
        }
    } else {
        return { loggedIn: false, userProfile: null };
    }
};

