import request from "supertest";
import { app } from "@/server";
import { StatusCodes } from "http-status-codes";

describe("Transaction API", () => {
  describe("GET /api/transactions", () => {
    it("should return a list of all transactions (expenses and transfers)", async () => {
      const response = await request(app)
        .get("/api/transactions")
        .expect(StatusCodes.OK);

      expect(Array.isArray(response.body)).toBe(true);
      
      // Check that transactions have the expected structure
      if (response.body.length > 0) {
        const transaction = response.body[0];
        expect(transaction).toHaveProperty("id");
        expect(transaction).toHaveProperty("amount");
        expect(transaction).toHaveProperty("description");
        expect(transaction).toHaveProperty("date");
        expect(transaction).toHaveProperty("kind");
        expect(["expense", "transfer"]).toContain(transaction.kind);
        
        // Check ID format (should be "expense-{id}" or "transfer-{id}")
        expect(typeof transaction.id).toBe("string");
        expect(transaction.id).toMatch(/^(expense|transfer)-\d+$/);
        
        // Check amount is positive
        expect(transaction.amount).toBeGreaterThan(0);
        
        // Check unified structure properties (both expenses and transfers use payer/participants)
        expect(transaction).toHaveProperty("payer");
        expect(transaction).toHaveProperty("participants");
        expect(Array.isArray(transaction.participants)).toBe(true);
        
        if (transaction.kind === 'expense') {
          // For expenses, participants can be multiple people
          expect(transaction.participants.length).toBeGreaterThanOrEqual(0);
        } else if (transaction.kind === 'transfer') {
          // For transfers, participants should be exactly one person (the target)
          expect(transaction.participants.length).toBe(1);
        }
      }
    });

    it("should return transactions sorted by date in descending order", async () => {
      const response = await request(app)
        .get("/api/transactions")
        .expect(StatusCodes.OK);

      if (response.body.length > 1) {
        const transactions = response.body;
        for (let i = 0; i < transactions.length - 1; i++) {
          const currentDate = new Date(transactions[i].date);
          const nextDate = new Date(transactions[i + 1].date);
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
        }
      }
    });
  });
});