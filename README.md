# REST API WITH MONGODB

##### dependency
- "express", "nodemon", "cors", "dotenv", "mongoose"

---


`index.js`
```js
const app = require('./app');
const config = require('./config/config');

const PORT = config.app.PORT;

app.listen(PORT, ()=> {
    console.log(`server is running http://localhost:${PORT}`);
})
```

---


`app.js`
```js
const express = require('express');
const cors = require('cors');

const userRouting = require('./routing/user.routing');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./config/db');



app.use('/api/users', userRouting);

module.exports = app;
```

---


`config`
```js
require("dotenv").config();

const dev = {
    app: {
        PORT: process.env.PORT || 5000
    },
    // DB_URL = mongodb+srv://<username>:<password>@cluster0.g5ey8mr.mongodb.net/DatabaseName
    db: {
        url: process.env.DB_URL || "mongodb://127.0.0.1:27017/usslDB",
    }
}

module.exports = dev;
```

---


`db`
```js
const config = require('./config');
const mongoose = require('mongoose');

const dbURL = config.db.url;

mongoose.connect(dbURL)
.then(()=> {
    console.log("mongodb is connected");
})
.catch((error)=> {
    console.log(error);
    process.exit(1);
})
```

---

`user.model.js`
```js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema);

```

---


`user.routing.js`
```js
const { getAllUsers, createUser, getSingleUser, deleteUser, updateUser } = require("../controller/user.controller");

const router = require("express").Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getSingleUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;
```

---

`user.controller.js`
```js
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
```

---



