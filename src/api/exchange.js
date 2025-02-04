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

  const { code, redirect_uri } = req.body;
  console.log('Received exchange request:', { code, redirect_uri });

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Token exchange successful');
    res.json(response.data);
  } catch (error) {
    console.error('Token exchange failed:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
};