const Employee = require('../model/employee.model');



// create employee 
const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};


// login employee 
const loginEmployee = async (req, res) => {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email: email });
    if (employee) {
        if (employee.password == password) {
            res.json("Success");
        } else {
            res.json("password is incorrect");
        }
    } else {
        res.json("not found");
    }

}



// get all employee 
const getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = {
    createEmployee,
    loginEmployee,
    getAllEmployee,
}

