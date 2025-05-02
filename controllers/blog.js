const BlogPost = require('../models/Blog');
const { errorHandler } = require('../auth');

// Create a Blog Post
module.exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });

        const post = new BlogPost({ title, content, author: req.user.id });
        await post.save();

        // Populate author details before returning the response
        const updatedPost = await BlogPost.findById(post._id).populate('author', 'username');

        res.status(201).json({ message: 'Post created successfully', updatedPost });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


// Get All Blog Posts
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .populate('comments.author', 'username');
    res.status(200).json({ posts });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Get a Single Blog Post by ID
module.exports.getPostById = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id)
            .populate('author', 'username')
            .populate('comments.author', 'username');

        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ post });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Update a Blog Post (Only Owner)
module.exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        // Update only the provided fields
        if (title) post.title = title;
        if (content) post.content = content;

        const updatedPost = await post.save();

        // Populate author details and comment authors before returning
        const populatedPost = await BlogPost.findById(post._id)
            .populate('author', 'username')  // ✅ Ensure post author name is included
            .populate('comments.author', 'username');  // ✅ Ensure comment authors' names are included

        res.status(200).json({ message: 'Post updated successfully', populatedPost });
    } catch (error) {
        errorHandler(error, req, res);
    }
};



// Delete a Blog Post (Only Owner)
module.exports.deletePost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Admin Delete Any Blog Post
module.exports.adminDeletePost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Add a Comment to a Blog Post
module.exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: 'Comment content is required' });

        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments.push({ content, author: req.user.id, blogPostID: req.params.id });
        await post.save();

        // Populate both post author and comment authors before returning response
        const updatedPost = await BlogPost.findById(req.params.id)
            .populate('author', 'username')   // ✅ Populate post author's name
            .populate('comments.author', 'username');  // ✅ Populate comment authors' names

        res.status(200).json({ message: 'Comment added successfully', updatedPost });
    } catch (error) {
        errorHandler(error, req, res);
    }
};



// Get Comments for a Blog Post
module.exports.getCommentsForPost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id).populate('comments.author', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ comments: post.comments });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Delete a Comment (Only Owner)
module.exports.deleteComment = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ 'comments._id': req.params.id });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const commentIndex = post.comments.findIndex(c => c._id.toString() === req.params.id && c.author.toString() === req.user.id);
        if (commentIndex === -1) return res.status(403).json({ message: 'Unauthorized' });

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Admin Delete Any Comment
module.exports.adminDeleteComment = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ 'comments._id': req.params.id });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const commentIndex = post.comments.findIndex(c => c._id.toString() === req.params.id);
        if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

