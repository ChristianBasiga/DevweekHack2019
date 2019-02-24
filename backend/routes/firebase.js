const firebase = require('firebase');
const expressApp = require('../index.js').app;


//Send to env variable later.

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "devweekhack2019.firebaseapp.com",
    databaseURL: "https://devweekhack2019.firebaseio.com",
    projectId: "devweekhack2019",
    storageBucket: "devweekhack2019.appspot.com",
    messagingSenderId: "950622031834"
  };

  
const app = firebase.initializeApp(config);



module.export={
    app
};
//Post request to creates scav hunts.

//Get request to get hunts.