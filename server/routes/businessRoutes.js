const express = require('express');
const BusinessController = require('../controllers/businessController');
const verifyToken = require('../middleware/authMiddleware');
const {businessRegisterValidation, businessLoginValidation,businessUpdateValidation} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', businessRegisterValidation, BusinessController.createBusiness);
router.post('/login', businessLoginValidation, BusinessController.login);
router.post('/logout', verifyToken, BusinessController.logout);
router.get('/my-business', verifyToken, BusinessController.getMyBusiness);
router.post('/update-account', verifyToken, businessUpdateValidation, BusinessController.updateAccount);
router.post('/delete-account', verifyToken, BusinessController.deleteAccount);
router.post('/forgot-password', BusinessController.forgotPassword);
router.post('/reset-password/:token', BusinessController.resetPassword);



module.exports = router;