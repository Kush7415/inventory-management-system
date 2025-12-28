import express, { Request, Response } from 'express';
import Category, { ICategory } from '../models/Category';

const router = express.Router();

// GET all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single category by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new category
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = new Category({ name, description });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update category
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE category
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

