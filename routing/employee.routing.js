const { createEmployee, getAllEmployee, loginEmployee } = require('../controller/employee.controller');

const router = require('express').Router();

router.post('/register', createEmployee);
router.post('/login', loginEmployee);
router.get('/register', getAllEmployee);

module.exports = router;