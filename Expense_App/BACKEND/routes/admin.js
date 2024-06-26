const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/get-expense', adminController.getExpenses);

router.post('/create-expense', adminController.postExpense);

router.delete('/delete-expense/:id', adminController.deleteExpense);

router.get('/get-edit-expense/:id', adminController.getEditExpense);

router.patch('/post-edit-expense/:id', adminController.postEditExpense);

module.exports = router;