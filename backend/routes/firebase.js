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

expressApp.get("/getFencesOfHunt", (req,res) => {

    const {huntId} = req.params;


    const firestore = firebase.firestore();


    const fenceCollection = firestore.collection("ScavengerHunts").doc(huntId).collection("Fences");

    fenceCollection.get()
        .then (fencesSnapshot => {

            const fences = [];
            if (fencesSnapshot.exists){

                fencesSnapshot.docs.forEach( docSnapshot => {

                    if (docSnapshot.exists){

                        fences.push(docSnapshot.data());
                    }
                })

                res.send(fences);
            }
            else{

                res.send({error:"Cannot load fences for Hunt"});
            }
        })
        .catch(err => {

            console.log(err);
        })

});

expressApp.get("/getItemsOfHunt", (req,res) => {

    const {huntId} = req.params
    const firestore = firebase.firestore();

    const itemCollection = firestore.collection("ScavengerHunts").doc(huntId).collection("Items");

     itemCollection.get()
        .then (itemsSnapshot => {

            if (!itemsSnapshot.exists){
                 res.send({isEmpty:true});
                 return true;
            }
            const items = [];
            itemsSnapshot.forEach(docSnapshot => {

                if (docSnapshot.exists){

                    const item = docSnapshot.data();
                    items.push(item);
                }
            });

            res.send(items);

        })
        .catch(err => {

            console.log("Failed to fetch items for " + huntId, err);
        })




});

expressApp.get("/getAllHunts", async (req, res) => {

    //Gets collection of hunts, then it's items.

    const firestore = firebase.firestore();
    const huntCollection = firestore.collection("ScavengerHunts");

    //Maybe pull all items later? since got id anyway.
    var hunts = [];

    const collectionSnapshot = await huntCollection.get();
        


    collectionSnapshot.docs.forEach( doc => {
                    //Stuff like general location of hunt or locations/
                    //hunt takes place.
        const generalHuntInfo = doc.data();
        hunts.push(generalHuntInfo);
                    //Then get all items of each respective doc.
                   
    });
                

             
            

            //I get to here.
    res.send(hunts);
       

});


module.export={
    firebase
};
//Post request to creates scav hunts.

//Get request to get hunts.