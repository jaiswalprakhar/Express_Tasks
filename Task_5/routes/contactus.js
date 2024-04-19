const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController');

router.get('/contactus', contactusController.getContactus);

router.post('/contactus', contactusController.postContactus);

module.exports = router;