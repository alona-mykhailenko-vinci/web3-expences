#!/bin/bash

echo "=== Testing Expenses API ==="
echo

echo "1. Testing GET /api/expenses (initial state):"
echo "Command: curl -X GET http://localhost:3000/api/expenses"
echo
curl -X GET http://localhost:3000/api/expenses
echo
echo

echo "2. Testing POST /api/expenses (adding first test expense):"
echo "Command: curl -X POST http://localhost:3000/api/expenses -H \"Content-Type: application/json\" -d '{\"date\":\"2025-01-20\",\"description\":\"Test expense #1\",\"payer\":\"TestUser1\",\"amount\":99.99}'"
echo
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-01-20","description":"Test expense #1","payer":"TestUser1","amount":99.99}'
echo
echo

echo "3. Testing POST /api/expenses (adding second test expense):"
echo "Command: curl -X POST http://localhost:3000/api/expenses -H \"Content-Type: application/json\" -d '{\"date\":\"2025-01-21\",\"description\":\"Test expense #2\",\"payer\":\"TestUser2\",\"amount\":150.50}'"
echo
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-01-21","description":"Test expense #2","payer":"TestUser2","amount":150.50}'
echo
echo

echo "4. Testing GET /api/expenses (after adding test expenses):"
echo "Command: curl -X GET http://localhost:3000/api/expenses"
echo
curl -X GET http://localhost:3000/api/expenses
echo
echo

echo "5. Testing POST /api/expenses/reset (resetting to initial state):"
echo "Command: curl -X POST http://localhost:3000/api/expenses/reset"
echo
curl -X POST http://localhost:3000/api/expenses/reset
echo
echo

echo "6. Testing GET /api/expenses (after reset - should be back to initial state):"
echo "Command: curl -X GET http://localhost:3000/api/expenses"
echo
curl -X GET http://localhost:3000/api/expenses
echo
echo

echo "=== Complete API Testing Done ==="
echo "✅ Test sequence:"
echo "   1. Get initial expenses"
echo "   2. Add test expense #1"
echo "   3. Add test expense #2"
echo "   4. Verify expenses were added"
echo "   5. Reset to initial state"
echo "   6. Verify reset worked"