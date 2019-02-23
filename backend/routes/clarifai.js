const Clarifai = require('clarifai');
require('dotenv/config');

const expressApp = require('../index.js').app;

const app = new Clarifai.App({

    apiKey: process.env.CLARIFAI_API_KEY
});

//Image post to send back concepts from clarifai to client.