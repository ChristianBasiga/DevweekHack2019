const Firebase = require('firebase');
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


const firebase = Firebase.initializeApp(config);


expressApp.get("/getAllHunts", (req, res) => {

    //Gets collection of hunts, then it's items.

    console.log("I am called");
    const firestore = firebase.firestore();
    const huntCollection = firestore.collection("ScavengerHunts");
    var hunts = [];

    huntCollection.get()
        .then(collectionSnapshot => {


//Should this also be an object in TomTom? Maybe would need to make sure the picture they took is actually within that
            collectionSnapshot.docs.forEach(async doc => {

                if (doc.exists){


                    //Stuff like general location of hunt or locations/
                    //hunt takes place.
                    const generalHuntInfo = doc.data();

                    //Then get all items of each respective doc.
                    const itemsRef = doc.ref.collection("Items");

                    const itemsSnapshot = await itemsRef.get()

                    var items = [];
                    itemsSnapshot.docs.forEach(itemDoc => {

                                if (itemDoc.exists){


                                    const item = itemDoc.data();
                                    //Should have both itemid and item name.
                                    //Then for displaying photo as 
                                    console.log("item",item);
                                    items.push(item);
                                }

                    });


                    const hunt = {
                        summary: generalHuntInfo,
                        items:items
                    };
    
                    hunts.push(hunt);
                }
                

             
            });

            //I get to here.
            res.send({hunts:hunts});

        })
        .catch(err => {

            console.log("Failed to fetch all scavenger hunts", err);
            res.send({err});
        })

});


module.export={
    firebase
};
//Post request to creates scav hunts.

//Get request to get hunts.