const express = require('express');
const { body, param } = require('express-validator');
const userController = require('./userController');
const router = express.Router();
const {verifyUser} = require('../middlewares/authMiddleware')
router.post(
  '/createuser',
  [
    body('firstName').notEmpty().withMessage('First name is required.'),
    body('lastName').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  ],
  userController.createUser
);

router.get('/getallusers', verifyUser,userController.getUsers);

router.get('/getuser/:id', verifyUser,param('id').isMongoId(), userController.getUserById);

router.get('/getuserdetails',verifyUser,userController.currentUser)

router.put('/updateuser/:id',userController.updateUser);

router.delete('/deleteuser/:id',verifyUser, param('id').isMongoId(), userController.deleteUser);

router.post('/login',userController.LoginUser)

module.exports = router;
