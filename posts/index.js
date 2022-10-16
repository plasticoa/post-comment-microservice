const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
// for parsing application/json
app.use(bodyParser.json());

app.use(cors());

// This is the in-memory store for our posts.
const posts = {};

//retrieve all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});


//create a post
app.post('/posts', async (req, res) => {
    //generate a random id for the post
    const id = randomBytes(4).toString('hex');
    //get the title and content from the request body
    const { tittle } = req.body;
    //save the post
    posts[id] = {
        id,
        tittle
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, tittle
        }
    })
    //send the response 
    res.status(201).send(posts[id]);
});
//recive any event incoming from event bus
app.post('/events', (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
})
//app.listen to start a Node.js server instance
app.listen(4000, () => {
    console.log('Listening on 4000');
});