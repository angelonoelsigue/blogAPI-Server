const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blogPostID: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
}, { timestamps: true });  // ✅ Adds `createdAt` & `updatedAt` for each comment

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema],  // ✅ Embedding comments inside posts
}, { timestamps: true });  // ✅ Adds `createdAt` & `updatedAt` for blog posts

module.exports = mongoose.model('BlogPost', blogPostSchema);
