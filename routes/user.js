const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verify, verifyAdmin } = require('../auth');

// Registration route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Retrieve User Details
router.get('/details', verify, userController.getUserDetails);

module.exports = router;