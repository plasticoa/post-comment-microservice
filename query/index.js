const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors);

const post = {};


app.get('/posts', (req, res) => {

});

app.post('/events', (req, res) => {

});

app.listen(4002, () => {
    console.log("Listeninig on 4002");
});