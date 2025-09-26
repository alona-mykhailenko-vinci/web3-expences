const express = require('express');
const router = express.Router();
const expensesService = require('../services/expenses');

/**
 * GET /expenses
 * Returns all expenses from the JSON file
 */
router.get('/expenses', (req, res) => {
  try {
    const expenses = expensesService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

/**
 * POST /expenses
 * Adds a new expense to the JSON file
 * Expected body: { date, description, payer, amount }
 */
router.post('/expenses', (req, res) => {
  try {
    const { date, description, payer, amount } = req.body;
    
    // Validate required fields
    if (!date || !description || !payer || amount === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: date, description, payer, amount' 
      });
    }

    // Validate amount is a number
    if (typeof amount !== 'number' || isNaN(amount)) {
      return res.status(400).json({ 
        error: 'Amount must be a valid number' 
      });
    }

    // Validate date format (basic check)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ 
        error: 'Date must be in YYYY-MM-DD format' 
      });
    }

    const expenseData = {
      date,
      description,
      payer,
      amount: Number(amount)
    };

    const newExpense = expensesService.addExpense(expenseData);
    
    if (newExpense) {
      res.status(201).json(newExpense);
    } else {
      res.status(500).json({ error: 'Failed to add expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

/**
 * POST /expenses/reset
 * Resets expenses to initial state from expenses.init.json
 */
router.post('/expenses/reset', (req, res) => {
  try {
    const resetData = expensesService.resetExpenses();
    
    if (resetData) {
      res.json({
        message: 'Expenses successfully reset to initial state',
        expenses: resetData,
        count: resetData.length
      });
    } else {
      res.status(500).json({ error: 'Failed to reset expenses' });
    }
  } catch (error) {
    console.error('Error resetting expenses:', error);
    res.status(500).json({ error: 'Failed to reset expenses' });
  }
});

module.exports = router;