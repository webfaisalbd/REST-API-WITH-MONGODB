const express = require('express');
const cors = require('cors');

const userRouting = require('./routing/user.routing');
const employeeRouting = require('./routing/employee.routing');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./config/db');



app.use('/api/users', userRouting);
app.use('/api/employee', employeeRouting);

module.exports = app;