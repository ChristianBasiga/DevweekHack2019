const  app = require('../index.js').app;
const axios = require('axios');
const firebase = require('firebase');
const adminKey = process.env.TOMTOM_ADMIN_KEY;
const apiKey = process.env.TOMTOM_API_KEY;

const clarifai = require('./clarifai');
const baseURL = "https://api.tomtom.com/geofencing/1";

const keyParams = {
    
    api: "key="+apiKey,
    admin: "adminKey="+adminKey,
};




//Creates hunt on firestore, project on tomtom, and model in clarifai.
//NEED TO REORGANIZE FILES BETTER LATER, kinda messy now.
app.post("/createHunt", (req,res) => {


    const {huntName} = req.body;

    //This will init project from tomtom api.
    axios.post(baseURL + "/projects/project?" + keyParams.api + "&" + keyParams.admin,
        {

            name: huntName
        })
        .then (project => {


                //Then after project created store into collection in firestore.

                const firestore = firebase.firestore();
                const scavCollection = firestore.collection("ScavengerHunts");

                //Also need the clarify here, creating different scripts almost irrelvant now.

                scavCollection.doc(project.data.id).set({
                    items:["concept"]
                })
                .then (response => {

                    
                    //Might make this model also be uuid, but that's optimization.
                    clarifai.models.create(huntName)
                        .then (
                            model => {

                                //Only send if all parts were created correctly.
                                res.send({project:project.data});

                            }

                        )

                });
             
        })
        .catch(err => {

            res.send({error:err})
        });
});



app.get("/joinHunt", async (req,res) => {


    console.log("body", req.body);
    const {projectId} = req.body;
    //body will have project id or id of scavenger hunt.
    const firestore = firebase.firestore();



    //For items.
    const huntCollection = firestore.collection("ScavengerHunts").doc(projectId);

    try{
        const huntItemList = await huntCollection.get();

        //Next fetch fences for project.

        const url = baseURL + "/projects/"+projectid+"?" + keyParams.api;


        const response = await axios.get(url);

        console.log("response from tomtom", response);

        const fences = response.fences;

        console.log("fences", fences);

        res.send({
            fences: fences,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            items: huntItemList,
        });

    }
    catch(err) {

        console.log("error", err);
    }
});


//Creates object id in tomtom app
app.post("/registerUser", (req, res) => {



    const {name, selectedHunt} = req.body;
    const url = baseURL + "/objects/object?" + keyParams.api + "&" + keyParams.admin;

    
    axios.post(url,{
        name: name,
        defaultProject: selectedHunt,
        properties:{

            OS: "android"
        }
    })
    .then (created => {

        res.send({created});

    })
    .catch(err => {

        console.log("error",err);

    });


});







//Report request post.


//Get Fences in vicinity 


