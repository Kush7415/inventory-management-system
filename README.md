# Inventory Management System - Backend

A RESTful API backend for managing inventory items and categories, built with Express, TypeScript, and MongoDB.

## Features

- **Item Management**: Create, read, update, and delete inventory items
- **Category Management**: Organize items by categories
- **Stock Tracking**: Automatic status updates based on quantity and reorder levels
- **Low Stock Alerts**: Get notifications for items that need restocking
- **Search & Filter**: Search items by name, description, SKU, or filter by category/status

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory-management
```

For MongoDB Atlas (cloud), use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory-management
```

## Running the Server

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for auto-reloading on file changes.

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Items
- `GET /api/items` - Get all items (supports query params: `category`, `status`, `search`)
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `PATCH /api/items/:id/quantity` - Update item quantity (supports `operation`: 'add', 'subtract', or 'set')
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/alerts/low-stock` - Get low stock and out of stock items

## Example API Requests

### Create a Category
```json
POST /api/categories
{
  "name": "Electronics",
  "description": "Electronic items and gadgets"
}
```

### Create an Item
```json
POST /api/items
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "category": "category_id_here",
  "quantity": 50,
  "price": 999.99,
  "sku": "LAP-001",
  "reorderLevel": 10
}
```

### Update Item Quantity
```json
PATCH /api/items/:id/quantity
{
  "quantity": 5,
  "operation": "subtract"
}
```

## Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── Category.ts
│   │   └── Item.ts
│   ├── routes/
│   │   ├── categoryRoutes.ts
│   │   └── itemRoutes.ts
│   └── server.ts
├── dist/              (generated after build)
├── package.json
├── tsconfig.json
└── .env
```

## Item Status

Items automatically update their status based on quantity:
- **in_stock**: Quantity > reorder level
- **low_stock**: Quantity ≤ reorder level but > 0
- **out_of_stock**: Quantity = 0

