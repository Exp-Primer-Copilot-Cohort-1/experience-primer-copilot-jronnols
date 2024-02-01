// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create an empty object to store comments
const commentsByPostId = {};

// Create a route handler for GET request to the /posts/:id/comments endpoint
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a route handler for POST request to the /posts/:id/comments endpoint
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random ID
    const commentId = randomBytes(4).toString('hex');

    // Get the content from the request body
    const { content } = req.body;

    // Get the comments array for the post ID
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the comments array
    comments.push({ id: commentId, content });

    // Store the comments array in the comments object
    commentsByPostId[req.params.id] = comments;

    // Send back the comments array
    res.status(201).send(comments);
});

// Start the web server on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});