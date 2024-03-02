const { body, validationResult } = require('express-validator');



const addressValidator = (value) => {
    try{
      if (!value) {
        return true;
      }
      const validKeys = ['city', 'district', 'street', 'address_text', 'latitude', 'longitude'];
      const invalidKeys = Object.keys(value).filter((key) => !validKeys.includes(key));
      
      if (invalidKeys.length > 0) {
        throw new Error(`Invalid keys in address: ${invalidKeys.join(', ')}`);
      }
      
      return true;
    }catch (error) {
        console.log(error)
    }
};
const appointmentDateValidator = (value) => {
  try{
    if (!value) {      
      throw new Error(`date is required`);
    }

    const validKeys = ['day', 'month', 'year', 'start', 'end'];
    const invalidKeys = Object.keys(value).filter((key) => !validKeys.includes(key));
    
    if (invalidKeys.length > 0) {
      throw new Error(`Invalid keys in address: ${invalidKeys.join(', ')}`);
    }

    validKeys.forEach((key) => {
      if (value[key] === null || value[key] === undefined) {
        throw new Error(`date.${key} is required`);
      }
    });
    
    
    return true;
  }catch (error) {
      console.log(error)
  }
};


// USER VALIDATIONS 
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


// BUSINESS VALIDATIONS
const businessRegisterValidation = (req, res, next) => {
  const validationRules = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('phone').optional().isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'),
    body('type').notEmpty().withMessage('Type is required').isIn(['hairdresser','beauty-salon','psychologist','dental-clinic','astroturf','auto-service','massage-center','consultancy-service']).withMessage('Invalid value for type'),
    body('address').custom(addressValidator),
    body('working_days').notEmpty().withMessage('working_days is required'),
    body('working_hours').notEmpty().withMessage('working_hours is required'),
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
const businessLoginValidation = (req, res, next) => {
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
const businessUpdateValidation = (req, res, next) => {
    const { name, long_name, phone, email, password, type, profile_image, images, content, services, address } = req.body;
    const validationRules = [];

    if (name !== undefined) {
        validationRules.push(body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'));
    }
    if (long_name !== undefined) {
        validationRules.push(body('long_name').notEmpty().withMessage('Long name is required').isString().withMessage('Long name must be a string'));
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
    if (type !== undefined) {
        validationRules.push(body('type').notEmpty().withMessage('Type is required'));
    }
    if (profile_image !== undefined) {
        validationRules.push(body('profile_image').optional().isString().withMessage('profile_image must be a string'));
    }
    if (images !== undefined) {
        validationRules.push(body('images').optional().isArray().withMessage('images must be a array'));
    }
    if (content !== undefined) {
        validationRules.push(body('content').optional().isString().withMessage('content must be a string'));
    }
    if (services !== undefined) {
        validationRules.push(body('services').optional().isArray().withMessage('services must be a array'));
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


// APPOINTMENT VALIDATIONS
const makeAppointmentValidation = (req, res, next) =>{
  const validationRules = [
    body('business_id').notEmpty().withMessage('business_id is required'),
    body('date').custom(appointmentDateValidator),
    body('start_time').custom((value) => {
      
      if (!value) {      
        throw new Error(`start_time is required`);
      }
      try {
        start_time = new Date(value + 'Z');
        return true;
      }catch (error) {
        throw new Error(`start_time must be Date`);
      }
  
    }),
    body('end_time').custom((value) => {
      if (!value) {      
        throw new Error(`end_time is required`);
      }
      try {
        end_time = new Date(value + 'Z');
        return true;
      }catch (error) {
        throw new Error(`end_time must be Date`);
      }
  
    }),
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

}
const closeAppointmentValidation = (req, res, next) =>{
  const validationRules = [
    body('date').custom(appointmentDateValidator),
    body('start_time').custom((value) => {
      
      if (!value) {      
        throw new Error(`start_time is required`);
      }
      try {
        start_time = new Date(value + 'Z');
        return true;
      }catch (error) {
        throw new Error(`start_time must be Date`);
      }
  
    }),
    body('end_time').custom((value) => {
      if (!value) {      
        throw new Error(`end_time is required`);
      }
      try {
        end_time = new Date(value + 'Z');
        return true;
      }catch (error) {
        throw new Error(`end_time must be Date`);
      }
  
    }),
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

}
  

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,

  businessRegisterValidation,
  businessLoginValidation,
  businessUpdateValidation,

  makeAppointmentValidation,
  closeAppointmentValidation
};