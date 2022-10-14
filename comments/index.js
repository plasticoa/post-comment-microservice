const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    // if no comments then return empty array
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //if commentsByPostId[req.params.id] is undefined then it will be set to empty array
    const comments = commentsByPostId[req.params.id] || [];
    //pushing the comment to the array
    comments.push({ id: commentId, content });
    //setting the comments to the post id
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log("Listening on 4001")
})