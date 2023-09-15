const { getAllUsers, createUser, getSingleUser, deleteUser, updateUser } = require("../controller/user.controller");

const router = require("express").Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getSingleUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;