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
    comments.push({ id: commentId, content, status: 'pending' });
    //setting the comments to the post id

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId, content, postId: req.params.id, status: 'pending'
        }
    })

    res.status(201).send(comments);
});
//recive any event incoming from event bus
app.post('/events', async (req, res) => {
    console.log("received event", req.body.type);
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;

        const commnets = commentsByPostId[postId];

        const comment = commnets.find(comment => {
            return comment.id === id;
        });
        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id, status, postId, content
            }
        });
    }
    res.send({});
})
app.listen(4001, () => {
    console.log("Listening on 4001")
})