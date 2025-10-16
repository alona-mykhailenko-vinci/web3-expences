import { Router } from "express";
import * as transactionController from "./transactionController";

const transactionRouter = Router();

transactionRouter.get("/", transactionController.listTransactions);

export default transactionRouter;