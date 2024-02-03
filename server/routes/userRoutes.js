const express = require('express');
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const {userRegisterValidation,userLoginValidation,userUpdateValidation} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', userRegisterValidation, UserController.createUser);
router.post('/login', userLoginValidation, UserController.login);
router.get('/me', verifyToken, UserController.getMe);
router.post('/update-account', verifyToken, userUpdateValidation, UserController.updateAccount);
router.post('/delete-account', verifyToken, UserController.deleteAccount);

module.exports = router;