const multer = require('multer');
const path = require('path');
const fs = require('fs');

const businessStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const businessId = req.params.businessId;
    const directory = '../client/public/images/business/'+businessId;

    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, directory);
      }
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const uploadBusinessImage = multer({
  storage: businessStorage,
  limits: { fileSize: 1024 * 1024 * 20 } 
});



const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.userId;
    const directory = '../client/public/images/user/'+userId;

    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, directory);
      }
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: 1024 * 1024 * 20 } 
});


module.exports = { uploadBusinessImage, uploadUserImage };