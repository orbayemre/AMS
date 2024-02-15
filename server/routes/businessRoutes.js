const express = require('express');
const BusinessController = require('../controllers/businessController');
const verifyToken = require('../middleware/authMiddleware');
const {businessRegisterValidation, businessLoginValidation} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', businessRegisterValidation, BusinessController.createBusiness);
router.post('/login', businessLoginValidation, BusinessController.login);
router.get('/my-business', verifyToken, BusinessController.getMyBusiness);
/* 
router.post('/update-account', verifyToken, userUpdateValidation, UserController.updateAccount);
router.post('/delete-account', verifyToken, UserController.deleteAccount);
*/
module.exports = router;