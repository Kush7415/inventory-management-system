import { InventoryItem } from '../models/Inventory';

export let inventoryData: InventoryItem[] = [
  {
    id: '1',
    sku: 'SKU001',
    name: 'Cement Bags',
    category: 'Building Materials',
    quantity: 150,
    reorderPoint: 50,
    price: 350,
    lastUpdated: new Date(),
    status: 'in-stock'
  },
  {
    id: '2',
    sku: 'SKU002',
    name: 'Steel Rods',
    category: 'Building Materials',
    quantity: 30,
    reorderPoint: 40,
    price: 5500,
    lastUpdated: new Date(),
    status: 'low-stock'
  },
  {
    id: '3',
    sku: 'SKU003',
    name: 'Bricks',
    category: 'Building Materials',
    quantity: 5000,
    reorderPoint: 1000,
    price: 8,
    lastUpdated: new Date(),
    status: 'in-stock'
  }
];

