// controllers/ProductController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, stocks: true },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, stocks: true },
    });

    if (!product) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, price, categoryId: parseInt(categoryId) },
      include: { category: true, stocks: true },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price },
      include: { category: true, stocks: true },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};