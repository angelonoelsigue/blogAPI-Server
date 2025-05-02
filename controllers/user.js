const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');
const { errorHandler } = require('../auth');

// User Registration
module.exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!email.includes("@")) {
        return res.status(400).json({ error: 'Invalid Email Format' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Create new user
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });

            return newUser.save();
        })
        .then(() => res.status(201).json({ message: 'User registered successfully' }))
        .catch(error => errorHandler(error, req, res));
};

// User Login with Username or Email
module.exports.loginUser = (req, res) => {
    const { identifier, password } = req.body; // Identifier can be email or username

    if (!identifier) {
        return res.status(400).json({ message: 'Username or Email is required' });
    }

    User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Incorrect Username/Email or Password' });
            }

            return res.status(200).json({ access: auth.createAccessToken(user) });
        })
        .catch(error => errorHandler(error, req, res));
};

// Retrieve User Details
module.exports.getUserDetails = (req, res) => {
    User.findById(req.user.id)
        .select('-password') // Exclude password from response
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ user });
        })
        .catch(error => errorHandler(error, req, res));
};
