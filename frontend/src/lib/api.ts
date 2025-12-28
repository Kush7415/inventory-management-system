import { InventoryItem } from '../types/inventory';

const API_BASE_URL = 'http://localhost:5000/api/inventory';

export const inventoryApi = {
  // Get all inventory items
  getAll: async (): Promise<InventoryItem[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch inventory items');
    }
    return response.json();
  },

  // Get single inventory item by ID
  getOne: async (id: string): Promise<InventoryItem> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch inventory item');
    }
    return response.json();
  },

  // Create new inventory item
  create: async (item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'status'>): Promise<InventoryItem> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to create inventory item');
    }
    return response.json();
  },

  // Update existing inventory item
  update: async (id: string, item: Partial<Omit<InventoryItem, 'id' | 'lastUpdated'>>): Promise<InventoryItem> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }
    return response.json();
  },

  // Delete inventory item
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }
  },
};

