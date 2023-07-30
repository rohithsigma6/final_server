
const express = require('express');
const router = express.Router();
const mobileProductController = require('./mobileProductController'); 
const {verifyUser} = require('../middlewares/authMiddleware')

router.post('/postproduct',verifyUser, mobileProductController.createMobileProduct);
router.get('/getallproducts', mobileProductController.getAllMobileProducts);
router.get('/getproduct/:id', verifyUser,mobileProductController.getMobileProductById);
router.put('/updateproduct/:id', verifyUser,mobileProductController.updateMobileProductById);
router.delete('/deleteproduct/:id', verifyUser,mobileProductController.deleteMobileProductById);

module.exports = router;
