// controllers/StockController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all stocks
export const getStocks = async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: { product: true },
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a stock by ID
export const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await prisma.stock.findUnique({
      where: { id: parseInt(id) },
      include: { product: true },
    });

    if (!stock) {
      res.status(404).json({ msg: "Stock not found" });
      return;
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new stock
export const createStock = async (req, res) => {
  const { quantity, productId } = req.body;
  try {
    const stock = await prisma.stock.create({
      data: { quantity, productId: parseInt(productId) },
      include: { product: true },
    });
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a stock by ID
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedStock = await prisma.stock.update({
      where: { id: parseInt(id) },
      data: { quantity },
      include: { product: true },
    });
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a stock by ID
export const deleteStock = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStock = await prisma.stock.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedStock);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};