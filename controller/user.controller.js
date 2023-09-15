const User = require('../model/user.model');

// get all users 
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
}


// create user 
const createUser = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
        })
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};


// get single user
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json(user);
        console.log(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


// delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// update user
const updateUser = async (req, res) => {
    try {
        const changedUser = await User.findOne({ _id: req.params.id });
        changedUser.username = req.body.username;
        changedUser.email = req.body.email;
        await changedUser.save();
        res.status(200).json(changedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getSingleUser,
    deleteUser,
    updateUser
}