const Express = require('express');
const bodyParser = require('body-parser');


const cors = require('cors');


const app = Express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port,() => {

});


module.exports = {
    app
}