const router = require("express").Router();
const userController = require("../controllers/userController");

router.get('/all', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);



module.exports = router;