import { Router, Request, Response } from 'express';
import { inventoryData } from '../data/inventory';
import { InventoryItem } from '../models/Inventory';

const router = Router();

// Helper function to determine status based on quantity and reorderPoint
const getStatus = (quantity: number, reorderPoint: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= reorderPoint) return 'low-stock';
  return 'in-stock';
};

// GET all inventory items
router.get('/', (req: Request, res: Response) => {
  try {
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
});

// GET single item by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const item = inventoryData.find(i => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
});

// POST create new item
router.post('/', (req: Request, res: Response) => {
  try {
    const { sku, name, category, quantity, reorderPoint, price } = req.body;

    // Validation
    if (!sku || !name || !category || quantity === undefined || reorderPoint === undefined || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields: sku, name, category, quantity, reorderPoint, price' });
    }

    // Check if SKU already exists
    if (inventoryData.some(item => item.sku === sku)) {
      return res.status(400).json({ error: 'SKU already exists' });
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      sku,
      name,
      category,
      quantity: Number(quantity),
      reorderPoint: Number(reorderPoint),
      price: Number(price),
      lastUpdated: new Date(),
      status: getStatus(Number(quantity), Number(reorderPoint))
    };

    inventoryData.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
});

// PUT update existing item
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { sku, name, category, quantity, reorderPoint, price } = req.body;

    const itemIndex = inventoryData.findIndex(i => i.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if SKU is being changed and already exists
    if (sku && sku !== inventoryData[itemIndex].sku) {
      if (inventoryData.some(item => item.sku === sku && item.id !== id)) {
        return res.status(400).json({ error: 'SKU already exists' });
      }
    }

    // Update item
    const updatedItem: InventoryItem = {
      ...inventoryData[itemIndex],
      ...(sku && { sku }),
      ...(name && { name }),
      ...(category && { category }),
      ...(quantity !== undefined && { quantity: Number(quantity) }),
      ...(reorderPoint !== undefined && { reorderPoint: Number(reorderPoint) }),
      ...(price !== undefined && { price: Number(price) }),
      lastUpdated: new Date(),
      status: getStatus(
        quantity !== undefined ? Number(quantity) : inventoryData[itemIndex].quantity,
        reorderPoint !== undefined ? Number(reorderPoint) : inventoryData[itemIndex].reorderPoint
      )
    };

    inventoryData[itemIndex] = updatedItem;
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

// DELETE item
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const itemIndex = inventoryData.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    inventoryData.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
});

export default router;

