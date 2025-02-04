require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.use(cors({
  origin: 'chrome-extension://mclmkimbojpfimecdcokjfogeeafpnnj', // Allow requests from your Chrome extension
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { refresh_token } = req.body;
  console.log('Received refresh request:', { refresh_token });

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
};