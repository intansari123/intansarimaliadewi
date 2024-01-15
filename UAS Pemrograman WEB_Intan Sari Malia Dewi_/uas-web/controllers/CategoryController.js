import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      res.status(404).json({ msg: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};