// Login function - returns loggedIn status and user profile
export const login = async (): Promise<{ loggedIn: boolean; userProfile?: any }> => {
    try {
        // Get extension's unique redirect URL
        const redirectUrl = chrome.identity.getRedirectURL();
        console.log('Redirect URL:', redirectUrl);

        // Build Spotify authorization URL with required parameters
        const authUrl = 'https://accounts.spotify.com/authorize?' +
            new URLSearchParams({
                response_type: 'code',
                client_id: 'e3f6705da6a7449c819fcfadd059a6d8',
                scope: 'user-read-private user-read-email user-top-read',
                redirect_uri: redirectUrl
            }).toString();

        console.log('Auth URL:', authUrl);

        // Open Spotify login popup with auth URL, wait for response
        const responseUrl = await chrome.identity.launchWebAuthFlow({
            url: authUrl,
            interactive: true
        });

        // Check if response URL is received
        if (!responseUrl) {
            throw new Error('No response URL received');
        }

        // Extract auth code from Spotify response URL
        const url = new URL(responseUrl);
        const code = url.searchParams.get('code');

        // Ensure auth code is received
        if (!code) {
            throw new Error('No auth code received');
        }

        console.log('Got auth code:', code);

        // Call server at exchange endpoint to exchange auth code for tokens
        const response = await fetch('http://localhost:3000/exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                redirect_uri: redirectUrl
            })
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`Exchange failed: ${response.status}`);
        }

        // Get token data from exchange endpoint
        const tokens = await response.json();
        console.log('Got tokens:', tokens);

        // Store tokens in chrome local storage
        await new Promise<void>((resolve) => {
            chrome.storage.local.set({
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                token_expiry: tokens.expires_in * 1000 + Date.now()
            }, resolve);
        });

        console.log('Tokens stored successfully');

        // Fetch user profile using the access token
        const userProfile = await fetchUserProfile(tokens.access_token);
        return { loggedIn: true, userProfile }; // Return loggedIn status and user profile

    } catch (error) {
        console.error('Auth failed:', error);
        return { loggedIn: false }; // Return loggedIn status as false on error
    }
};

// Function to fetch user profile using access token
const fetchUserProfile = async (accessToken: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status}`);
    }

    return await response.json(); // Return the user profile data
};

// Function to get the access token from Chrome local storage
export const getAccessToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
        chrome.storage.local.get(['access_token', 'token_expiry', 'refresh_token'], async (result) => {
            const accessToken = result.access_token || null;
            const tokenExpiry = result.token_expiry || 0;
            const refreshToken = result.refresh_token || null;
            const now = Date.now();

            // Check if the access token is expired
            if (accessToken && now < tokenExpiry) {
                resolve(accessToken);
            } else if (refreshToken) {
                // Refresh the access token if it is expired
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    resolve(newAccessToken);
                } catch (error) {
                    console.error("Failed to refresh access token:", error);
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    });
};

// Function to refresh the access token using the refresh token - calls /refresh endpoint
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    console.log('Attempting to refresh access token with refresh token:', refreshToken);

    const response = await fetch('http://localhost:3000/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
        throw new Error(`Failed to refresh access token: ${response.status}`);
    }

    const tokens = await response.json();
    console.log('Refreshed tokens:', tokens);

    // Store the new access token and update the expiration time into chrome local storage
    await new Promise<void>((resolve) => {
        chrome.storage.local.set({
            access_token: tokens.access_token,
            token_expiry: tokens.expires_in * 1000 + Date.now()
        }, resolve);
    });

    return tokens.access_token;
};

const CACHE_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // Cache data every 24 hours
// Function to get cached data or fetch new data if expired

// ** KEY IS A DYNAMIC STRING THAT STORES/RETRIEVES DATA FROM CHROME LOCAL STORAGE DEPENDING ON KEY VALUE 
// - either short_term, medium_term, or long_term **
const getCachedData = async (key: string, fetchFunction: () => Promise<any>): Promise<any> => { // Promise<any> is the return type
    return new Promise((resolve) => {
        // Get data and timestamp stored from chrome local storage
        chrome.storage.local.get([key, `${key}_timestamp`], async (result) => {
            const lastUpdated = result[`${key}_timestamp`] || 0;
            const now = Date.now();

            // If cache exists and is valid, return it
            if (result[key] && now - lastUpdated < CACHE_EXPIRATION_TIME) {
                console.log(`Returning cached data for ${key}`);
                resolve(result[key]);
                return;
            }

            // Otherwise, fetch new data and update cache
            console.log(`Fetching new data for ${key}`);
            try {
                const newData = await fetchFunction(); // Calls the anonymous function, which calls fetchTopItems with 2 arguments
                
                // Sets result of fetchTopItems as [key] and [`${key}_timestamp`] as the timestamp in chrome local storage
                chrome.storage.local.set({ 
                    [key]: newData, // 
                    [`${key}_timestamp`]: now 
                });
                resolve(newData);
            } catch (error) {
                console.error(`Error fetching ${key}:`, error);
                resolve(null);
            }
        });
    });
};

// Fetch top tracks and artists
const fetchTopItems = async (type: "tracks" | "artists", timeRange: "short_term" | "medium_term" | "long_term") => {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("No access token found");

    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=50`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) throw new Error(`Failed to fetch top ${type}: ${response.status}`);
    return await response.json();
};

// Public functions to get cached or fresh data
export const getTopTracks = (timeRange: "short_term" | "medium_term" | "long_term") => 
    getCachedData(`top_tracks_${timeRange}`, () => fetchTopItems("tracks", timeRange)); // getCachedData calls an anonymous function that calls fetchTopItems with 2 arguments

export const getTopArtists = (timeRange: "short_term" | "medium_term" | "long_term") => 
    getCachedData(`top_artists_${timeRange}`, () => fetchTopItems("artists", timeRange));
