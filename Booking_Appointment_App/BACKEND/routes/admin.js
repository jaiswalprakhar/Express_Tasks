const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/get-appointment', adminController.getAppointments);

router.post('/create-appointment', adminController.postAppointment);

router.delete('/delete-appointment/:id', adminController.deleteAppointment);

module.exports = router;