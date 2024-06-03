const express = require('express');
const BusinessController = require('../controllers/businessController');
const verifyToken = require('../middleware/authMiddleware');
const {businessRegisterValidation, businessLoginValidation,businessUpdateValidation} = require('../middleware/validationMiddleware');
const { uploadBusinessImage } = require('../middleware/multerMiddleware');

const router = express.Router();

router.post('/register', businessRegisterValidation, BusinessController.createBusiness);
router.post('/login', businessLoginValidation, BusinessController.login);
router.post('/logout', verifyToken, BusinessController.logout);
router.get('/my-business', verifyToken, BusinessController.getMyBusiness);
router.post('/get-business', BusinessController.getBusiness);
router.get('/my-subbusiness', verifyToken, BusinessController.getMySubBusiness);
router.post('/get-subbusiness', BusinessController.getSubBusiness);
router.post('/change-hassub', verifyToken, BusinessController.changeHasSub);
router.post('/add-subbusiness', verifyToken, BusinessController.addSubBusiness);
router.post('/remove-subbusiness', verifyToken, BusinessController.removeSubBusiness);
router.post('/update-account', verifyToken, businessUpdateValidation, BusinessController.updateAccount);
router.post('/update-sub', verifyToken, BusinessController.updateSub);
router.post('/delete-account', verifyToken, BusinessController.deleteAccount);
router.post('/forgot-password', BusinessController.forgotPassword);
router.post('/reset-password/:token', BusinessController.resetPassword);
router.post('/add-off-time', verifyToken, BusinessController.addSpecialOffTime);
router.post('/remove-off-time', verifyToken, BusinessController.removeSpecialOffTime);
router.post('/upload/:businessId', verifyToken, uploadBusinessImage.single('image'), BusinessController.uploadImage);
router.post('/delete-image', verifyToken,  BusinessController.deleteImage);



module.exports = router;