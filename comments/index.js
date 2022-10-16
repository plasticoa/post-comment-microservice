const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    // if no comments then return empty array
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //if commentsByPostId[req.params.id] is undefined then it will be set to empty array
    const comments = commentsByPostId[req.params.id] || [];
    //pushing the comment to the array
    comments.push({ id: commentId, content });
    //setting the comments to the post id

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId, content, postId: req.params.id
        }
    })

    res.status(201).send(comments);
});
//recive any event incoming from event bus
app.post('/events', (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
})
app.listen(4001, () => {
    console.log("Listening on 4001")
})