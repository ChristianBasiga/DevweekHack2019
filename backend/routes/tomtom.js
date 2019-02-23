const  app = require('../index.js').app;
const axios = require('axios');
const adminKey = process.env.TOMTOM_ADMIN_KEY;
const apiKey = process.env.TOMTOM_API_KEY;
const {parse, stringify} =  require('flatted/cjs');
const util = require('util');

console.log("admin key", apiKey);

const baseURL = "https://api.tomtom.com/geofencing/1/projects/project";


//Project creation post.
app.post("/createHunt", (req,res) => {



    //This will init project from tomtom api.

    axios.post(baseURL + "?key=" + apiKey + "&adminKey="+adminKey,
        {

            name: "New Projectsss"
        })
        .then (project => {
             
                res.send({project:project.data});
        })
        .catch(err => {

            console.log(err);
            res.send({error:err})
        })

    

});









//Report request post.


//Get Fences in vicinity 


