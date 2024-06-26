const Expense = require('../models/expense');

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({allExpenses: expenses});
    }
    catch(err)  {
        console.log('Get Expenses is failing', err);
        res.status(500).json({errorMessage: err});
    }
}

exports.postExpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    try {
        const expenseData = await Expense.create({
            amount: amount,
            description: description,
            category: category
        })
        res.status(201).json({
            message: 'Expense Added',
            newExpense: expenseData
        });
    }
    catch(err) {
        console.log(err.message);
        res.status(500).json({ errorMessage: err});
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const result = await Expense.destroy({where: { id: expenseId }});
        if(result) {
            res.status(200).json( {message: `${expenseId} expense Deleted`} );
        }
        else {
            res.status(404).json({ message: `${expenseId} No such expense present` });
        }
    }
    catch(err)  {
        console.log(err);
        res.status(500).json({ errorMessage: err});
    }
}

exports.getEditExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const expenseData = await Expense.findByPk(expenseId);
        res.status(200).json({
            message: 'Auto Filling Expense into Form from db',
            expense: expenseData
        });
    }
    catch(err) {
        res.status(500).json({errorMessage: err});
    }
}

exports.postEditExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;

        const updatedAmount = req.body.amount;
        const updatedDescription = req.body.description;
        const updatedCategory = req.body.category;

        const expenseData = await Expense.findByPk(expenseId);
        
        if (!expenseData) {
            console.log('Expense not found')
            return res.status(404).json({ message: 'Expense not found' });
        }
        
        if (updatedAmount !== undefined) {
            expenseData.amount = updatedAmount;
        }
        if (updatedDescription !== undefined) {
            expenseData.description = updatedDescription;
        }
        if (updatedCategory !== undefined) {
            expenseData.category = updatedCategory;
        }
        
        await expenseData.save();
        console.log('Data saved');
        
        res.status(200).json({
            message: 'Expense Edited',
            editedExpense: expenseData
        });
    }
    catch(err) {
        res.status(500).json({errorMessage: err});
    }
}