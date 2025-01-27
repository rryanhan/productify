const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());  

const PORT = 3000;
const client_id = 'e3f6705da6a7449c819fcfadd059a6d8';
const client_secret = '7eb256c0a33841aaac297416ce64d47c';

// Create rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                    // 100 requests per IP
});

// Apply to all routes
app.use(limiter);

// Add the exchange endpoint
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});