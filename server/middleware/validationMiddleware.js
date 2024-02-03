const { body, validationResult } = require('express-validator');



const addressValidator = (value) => {
    try{

        if (!value) {
            return true;
          }
          const validKeys = ['city', 'district', 'street', 'address_text'];
          const invalidKeys = Object.keys(value).filter((key) => !validKeys.includes(key));
        
          if (invalidKeys.length > 0) {
            throw new Error(`Invalid keys in address: ${invalidKeys.join(', ')}`);
          }
        
          return true;
    }catch (error) {
        console.log(error)
    }
};

const userRegisterValidation = (req, res, next) => {
  const validationRules = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('surname').notEmpty().withMessage('Surname is required').isString().withMessage('Surname must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('phone').optional().isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'),
    body('address').custom(addressValidator),
  ];

  Promise.all(validationRules.map((validationRule) => validationRule.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const errorMessage = errors.array()[0].msg;
      return res.status(422).json({ message: errorMessage });
    })
    .catch((error) => {
      console.error('Validation error:', error);
      res.status(500).json({ message : 'Internal Server Error' });
    });
};

const userLoginValidation = (req, res, next) => {
    const validationRules = [
      body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
      body('password').notEmpty().withMessage('Password is required'),
    ];
  
    Promise.all(validationRules.map((validationRule) => validationRule.run(req)))
    .then(() => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next();
        }
        const errorMessage = errors.array()[0].msg;
        return res.status(422).json({ message: errorMessage });
    })
    .catch((error) => {
        console.error('Validation error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
};



const userUpdateValidation = (req, res, next) => {
    const { name, surname, email, password, phone, address } = req.body;
    const validationRules = [];

    if (name !== undefined) {
        validationRules.push(body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'));
    }
    if (surname !== undefined) {
        validationRules.push(body('surname').notEmpty().withMessage('Surname is required').isString().withMessage('Surname must be a string'));
    }
    if (email !== undefined) {
        validationRules.push(body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'));
    }
    if (password !== undefined) {
        validationRules.push(body('password').notEmpty().withMessage('Password is required'));
    }
    if (phone !== undefined) {
        validationRules.push(body('phone').optional().isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'));
    }
    if (address !== undefined) {
        validationRules.push(body('address') &&  body('address').custom(addressValidator));
    }
    
  
    Promise.all(validationRules.map((validationRule) => validationRule.run(req)))
    .then(() => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
  
        const errorMessage = errors.array()[0].msg;
        return res.status(422).json({ message: errorMessage });
    })
    .catch((error) => {
        console.error('Validation error:', error);
        res.status(500).json({ message : 'Internal Server Error' });
    });
};


  

module.exports = {userRegisterValidation,userLoginValidation,userUpdateValidation};