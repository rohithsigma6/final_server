const { User } = require('./userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    const { firstName, lastName, password, email } = req.body
    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });


        await newUser.save();

        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user.' });
    }
};

const updateUser = async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                password,

            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndRemove(id).select('-password');

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user.' });
    }
};
const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
       
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, "QWERTY", {

            expiresIn: '36500s'

        });

        res.json({ token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const currentUser = async (req, res) => {
    try {
        const { email } = req.body
        console.log(email)
        const user = await User.findOne({ email });
        console.log("user is ")
        console.log(user)
        if (user) {
            return res.send({ success: true, message: "Fetched user successfully", details: user })
        }
        return res.send({ success: true, message: "Error while fetching details" })
    } catch (err) {
        return res.send({ success: true, message: "Error while fetching details", details: err })
    }
}
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    LoginUser,
    currentUser
};
