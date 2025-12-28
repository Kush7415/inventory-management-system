import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// GET all items with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, status, search } = req.query;
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single item by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate('category', 'name description');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new item
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, category, quantity, price, sku, reorderLevel } = req.body;

    if (!name || !category || quantity === undefined || !price) {
      return res.status(400).json({ 
        error: 'Name, category, quantity, and price are required' 
      });
    }

    const item = new Item({
      name,
      description,
      category,
      quantity,
      price,
      sku,
      reorderLevel: reorderLevel || 10,
    });

    const savedItem = await item.save();
    await savedItem.populate('category', 'name');
    res.status(201).json(savedItem);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT update item
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, category, quantity, price, sku, reorderLevel } = req.body;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, category, quantity, price, sku, reorderLevel },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PATCH update item quantity (for stock adjustments)
router.patch('/:id/quantity', async (req: Request, res: Response) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add', 'subtract', or 'set'

    if (quantity === undefined) {
      return res.status(400).json({ error: 'Quantity is required' });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (operation === 'add') {
      item.quantity += quantity;
    } else if (operation === 'subtract') {
      item.quantity = Math.max(0, item.quantity - quantity);
    } else {
      item.quantity = quantity;
    }

    await item.save();
    await item.populate('category', 'name');
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET low stock items
router.get('/alerts/low-stock', async (req: Request, res: Response) => {
  try {
    const items = await Item.find({
      $or: [
        { status: 'low_stock' },
        { status: 'out_of_stock' },
      ],
    })
      .populate('category', 'name')
      .sort({ quantity: 1 });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

