const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());  

const PORT = process.env.PORT || 3000;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.use(cors());

// Create rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                    // 100 requests per IP
});

app.use(limiter);

// Token xchange endpoint - exchanges auth code for refresh and access tokens
app.post('/exchange', async (req, res) => {
    // Extract auth code and redirect_uri from request body
  const { code, redirect_uri } = req.body;
  console.log('Received exchange request:', { code, redirect_uri });
  
  // Exchange auth code for tokens
  try {
    // Send request to Spotify's token endpoint
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'), // Sends to Spotify's token endpoint to authenticate the request
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Token exchange successful'); 

    // Send back token information to the extension
    res.json(response.data); 
  } catch (error) {
    console.error('Token exchange failed:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

// Token refresh endpoint
app.post('/refresh', async (req, res) => {
  // Extract refresh token from request body
  const { refresh_token } = req.body;
  console.log('Received refresh request:', { refresh_token });

  // Refresh the access token
  try {
      // Send request to Spotify's token endpoint
      const response = await axios({
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          params: {
              refresh_token: refresh_token,
              grant_type: 'refresh_token'
          },
          headers: {
              'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'), // Sends to Spotify's token endpoint to authenticate the request
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      // Send the new tokens back to the client
      res.json(response.data);
  } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Failed to refresh token' });
  }
}); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});