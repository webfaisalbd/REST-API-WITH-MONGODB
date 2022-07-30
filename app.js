const express = require("express");
const cors = require("cors");
require("./config/db")

const userRouter = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/users',userRouter);


// api/users/       : GET :    Return all users
// api/users/:id    : GET :    Return specific user
// api/users/       : POST :   add user
// api/users/:id    : PATCH :  update specific user
// api/users/:id    : DELETE : delete specific user



// home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
})

// route not found
app.use((req,res, next)=>{
    res.status(404).json({
        message: "route not found."
    })
})

// server error
app.use((err, req,res, next)=>{
    res.status(500).json({
        message: "something broke."
    })
})


module.exports = app;