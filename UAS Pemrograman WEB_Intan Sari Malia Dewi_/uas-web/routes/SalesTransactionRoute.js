import express from "express";
import {
  getSalesTransactions,
  getSalesTransactionById,
  createSalesTransaction,
  updateSalesTransaction,
  deleteSalesTransaction,
} from "../controllers/SalesTransactionController.js";

const router = express.Router();

router.get("/sales-transactions", getSalesTransactions);
router.get("/sales-transactions/:id", getSalesTransactionById);
router.post("/sales-transactions", createSalesTransaction);
router.patch("/sales-transactions/:id", updateSalesTransaction);
router.delete("/sales-transactions/:id", deleteSalesTransaction);

export default router;
