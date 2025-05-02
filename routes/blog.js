const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { verify, verifyAdmin } = require('../auth');

// Blog Post Routes
router.post('/posts', verify, blogController.createPost);       // Create a blog post
router.get('/posts', verify, blogController.getAllPosts);               // Retrieve all blog posts
router.get('/posts/:id', verify, blogController.getPostById);           // Retrieve a single blog post
router.put('/posts/:id', verify, blogController.updatePost);    // Edit user's own post
router.delete('/posts/:id', verify, blogController.deletePost); // Delete user's own post
router.delete('/posts/:id/admin', verify, verifyAdmin, blogController.adminDeletePost); // Admin deletion

// Comment Routes
router.patch('/posts/:id/comments', verify, blogController.addComment);       // Add a comment to a post
router.get('/posts/:id/comments', verify, blogController.getCommentsForPost);        // Retrieve all comments on a post
router.delete('/comments/:id', verify, blogController.deleteComment);        // Delete user's own comment
router.delete('/comments/:id/admin', verify, verifyAdmin, blogController.adminDeleteComment); // Admin deletion

module.exports = router;
