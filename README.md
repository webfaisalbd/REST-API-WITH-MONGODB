## REST-API-WITH-MONGODB

- npm install express nodemon dotenv cors mongoose uuidv4

- install thunder client in vs code extension for alternative of postman software.

---
- routing
- api/users/       : GET :    Return all users
- api/users/:id    : GET :    Return specific user
- api/users/       : POST :   add user
- api/users/:id    : PATCH :  update specific user
- api/users/:id    : DELETE : delete specific user
---


## Heroku
// all deploy info 
- heroku info

// after adding db variable in heroku
- heroku restart


---

### Controller Part
```javascript
// get all users
const getSAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// get single user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// create single user
const createUser = async (req, res) => {
    try {
        const newUser = new User({
            id: uuidv4(),
            name: req.body.name,
            age: Number(req.body.age),
            
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// update single user
const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        user.name = req.body.name;
        user.age = Number(req.body.age);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// delete single user
const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ id: req.params.id })
        res.status(200).json({
            message: "User is deleted"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


```



