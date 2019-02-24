const Clarifai = require('clarifai');
require('dotenv/config');

const app = require('../index.js').app;

const clarifai = new Clarifai.App({

    apiKey: process.env.CLARIFAI_API_KEY
});






app.post("/comparePhoto", async (req,res) => {

    //items are items in hunt list,
    //Items will 
    const {huntId, photo, items } = req.body;


    const selectedConcepts = [];

    items.forEach(item => {

        selectedConcepts.push(item.id);
    })
    clarifai.models.get(huntId)
        .then (model => {


            //See if can predit using base 64 format.
            //Predict only based on items on list, this actually makes it much easier to choose.
            model.predict({base64: photo, selectedConcepts: items, minValue: 0.70})
                .then (prediction => {

                    //Need to see what this output would be
                    //Likely shows confidence
                    console.log("prediction: ", prediction);

                    const potentialLabels = prediction.data.concepts;
                    if (potentialLabels.length == 0){

                        res.send({matched:null});
                        return;
                    }

                    //otherwise just incase a picture matches two concepts, choose one with most confidence.

                    var matchedLabel = potentialLabels[0];
                    //Goes through likely labels.
                    for (var i = 0; i < potentialLabels.length && matchedLabel != null; ++i){


                        //Choose label with maximum confidence.
                        if (potentialLabels[i].value > matchedLabel.value){

                            matchedLabel = potentialLabels[i];
                        }
                    }


                    /*Ask for feedback of flow and understanding of this from mentors later.*/


                    res.send({matched: matchedLabel})
                    //If found a match, add this model as input with the matched concept, to label it
                    //then train model. So essentially everytime people succeed in hunt, it improves the model.
                    if (matchedLabel != null){

                        //match is feedback need for client, rest can continue on.
                        //Send back to client the matched label.
                        const concept = {value:true, id: matchedLabel.id};

                        //Label photo user took with the correct match to further train the model.
                        await clarifai.inputs.create({
                            base64: photo,
                            concepts:concept
                        });

                        //Then train model to recognize concept using previous inputs and newley created input from correct answer.
                        model.train(concept);
                    }
                    
                });

        })
        .catch ( err => {

            console.log(err);
        })




    


});




//Need to test this.
//Passing:
// project id of what hunt to add item to.
// video / array of pictures (Video can be break into frames.) to train a model for the item
//Restrict to be number of pictures, not video. The amount of frames will result in too many api calls.
app.post("/addItemToHunt", async (req,res) => {

    
    const {huntId, photosOfItem, item} = req.body;
    //Adds item's model id to firestore doc of the hunt.

    //Gotta make sure to set option when taking photo to be base64.
    //Creates inputs.
    //Just one concept for these photos
    
    const concepts = [{id:item.id, name:item.name, value:true}];
    const inputs = [];

    photosOfItem.forEach(photo => {
        
        //Blocking at these calls because want input to be set, before model gets updated and trained.

        //So what this does is put in the image and label it with the concept, right?
        //  
        //If concept exists, it should just create.
        inputs.push({
            base64: photo,
            concepts: concepts
        });

    });

    //Batches all images
    const modelInputs = await clarifai.inputs.create(inputs);

    //Okay, concepts needs to be added to model and inputs.

    //So project id in tomtom, id in firestore, and model id for clarifai will all be the same.

    //
    clarifai.models.get({model_id:huntId})
        .then (model => {

            //then add the concept to model.
            //block here cause want concepts before train.

            //I add concept to model, and it gets trained by input with that model.
            //that I set above so it learns to predict the same way the inputs did based on pictures
            //so input is there for all models, this may end up being innacurate but thnk right.
            await  model.mergeConcepts(concepts);


            
            //After merge concepts, add that to collection in firestore.

            const firestore = firebase.firestore();
            const itemsRef = firestore.collection("ScavengerHunts").doc(huntId).collection("Items")

            //Array or collection of docs?
            //Regardless want this to deleting items is easy.
            itemsRef.doc(item.id).set({

                //redundant take out later or add to object doc id.
                id: item.id,
                name: item.name

            });
                
                
            model.train()
                .then (response => {

                    //Once trained model with the picture and concepts
                    console.log("model trained ", response);
                })
                .catch(err => {

                    console.log("failed to train model", err);
                });
        })
        .catch(err => {

            console.log("Couldn't get model: ", huntId, err);
        });

});


modules.export=clarifai;