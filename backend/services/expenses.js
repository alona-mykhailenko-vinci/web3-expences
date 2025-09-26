const fs = require('fs');
const path = require('path');

const EXPENSES_FILE = path.join(__dirname, '../data/expenses.json');
const EXPENSES_INIT_FILE = path.join(__dirname, '../data/expenses.init.json');

/**
 * Read and parse all expenses from the JSON file
 * @returns {Array} Array of expense objects
 */
function getAllExpenses() {
  try {
    const data = fs.readFileSync(EXPENSES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading expenses file:', error);
    return [];
  }
}

/**
 * Add a new expense to the JSON file
 * @param {Object} expense - The expense object to add
 * @returns {boolean} True if successful, false otherwise
 */
function addExpense(expense) {
  try {
    const expenses = getAllExpenses();
    
    // Generate a new ID based on the highest existing ID
    const maxId = expenses.length > 0 
      ? Math.max(...expenses.map(e => parseInt(e.id))) 
      : 0;
    
    // Add the new expense with generated ID
    const newExpense = {
      ...expense,
      id: (maxId + 1).toString()
    };
    
    expenses.push(newExpense);
    
    // Write back to file
    fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
    
    return newExpense;
  } catch (error) {
    console.error('Error adding expense:', error);
    return null;
  }
}

/**
 * Save expenses array to the JSON file
 * @param {Array} expenses - Array of expense objects
 * @returns {boolean} True if successful, false otherwise
 */
function saveExpenses(expenses) {
  try {
    fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving expenses:', error);
    return false;
  }
}

/**
 * Reset expenses to initial state from expenses.init.json
 * @returns {Array|null} Array of reset expenses or null if error
 */
function resetExpenses() {
  try {
    // Read initial data
    const initData = fs.readFileSync(EXPENSES_INIT_FILE, 'utf8');
    const initialExpenses = JSON.parse(initData);
    
    // Overwrite current expenses with initial data
    fs.writeFileSync(EXPENSES_FILE, JSON.stringify(initialExpenses, null, 2));
    
    console.log('Expenses reset to initial state successfully');
    return initialExpenses;
  } catch (error) {
    console.error('Error resetting expenses:', error);
    return null;
  }
}

module.exports = {
  getAllExpenses,
  addExpense,
  saveExpenses,
  resetExpenses
};