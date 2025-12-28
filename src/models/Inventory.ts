export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  reorderPoint: number;
  price: number;
  lastUpdated: Date;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

