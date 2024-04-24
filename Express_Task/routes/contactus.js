const path = require('path');
const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactus');

router.get('/contactus', contactusController.getContactus);

router.post('/contactus', contactusController.postContactus);

router.get('/success', contactusController.success);

module.exports = router;