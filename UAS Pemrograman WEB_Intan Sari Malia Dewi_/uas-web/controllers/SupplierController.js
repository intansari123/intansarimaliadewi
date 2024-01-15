// controllers/SupplierController.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
    });

    if (!supplier) {
      res.status(404).json({ msg: "Supplier not found" });
      return;
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new supplier
export const createSupplier = async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    const supplier = await prisma.supplier.create({
      data: { name, email, address, phone },
    });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a supplier by ID
export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: { name, email, address, phone },
    });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a supplier by ID
export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSupplier = await prisma.supplier.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedSupplier);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};