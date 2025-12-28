# Inventory Management System

A full-stack inventory management application built with Next.js and Express.js, designed for managing inventory items with real-time search, filtering, and status tracking.

## 🚀 Live Demo

- **Frontend**: [https://inventory-management-system-sandy-five.vercel.app/](https://inventory-management-system-sandy-five.vercel.app/)
- **Backend API**: [https://inventory-backend-kje1.onrender.com](https://inventory-backend-kje1.onrender.com)

## 🚀 Features

- **Inventory Management**
  - View all inventory items in a responsive card layout
  - Real-time search by item name or SKU
  - Filter by status (In Stock, Low Stock, Out of Stock)
  - Filter by category
  - Automatic status calculation based on quantity and reorder point

- **RESTful API**
  - Complete CRUD operations for inventory items
  - In-memory data storage
  - Proper error handling and status codes
  - CORS enabled for frontend integration

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Color-coded status badges
  - Real-time filtering and search
  - Loading states and error handling
  - Professional card-based layout

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend
- **Express.js 5.2.1** - Web framework
- **TypeScript 5.9.3** - Type safety
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development server with auto-reload

## 📁 Project Structure

```
inventory-management-system/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app directory
│   │   ├── page.tsx         # Main inventory page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── src/
│   │   ├── lib/
│   │   │   └── api.ts        # API client functions
│   │   └── types/
│   │       └── inventory.ts # TypeScript interfaces
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── models/
│   │   │   └── Inventory.ts  # Inventory data model
│   │   ├── routes/
│   │   │   └── inventory.ts # API routes
│   │   ├── data/
│   │   │   └── inventory.ts # Sample data
│   │   └── server.ts         # Express server
│   ├── dist/                 # Compiled TypeScript (generated)
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd inventory-management-system
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

   You should see:
   ```
   Server running on port 5000
   ```

#### Frontend Application

1. Navigate to the frontend directory (in a new terminal):
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:3000`

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

## ☁️ Deployment

This application is deployed on two platforms:

### Frontend - Vercel
- **Platform**: [Vercel](https://vercel.com)
- **URL**: [https://inventory-management-system-sandy-five.vercel.app/](https://inventory-management-system-sandy-five.vercel.app/)
- **Deployment**: Automatic deployment on push to main branch
- **Features**: 
  - Fast global CDN
  - Automatic HTTPS
  - Serverless functions support

### Backend - Render
- **Platform**: [Render](https://render.com)
- **URL**: [https://inventory-backend-kje1.onrender.com](https://inventory-backend-kje1.onrender.com)
- **Deployment**: Automatic deployment on push to main branch
- **Note**: ⚠️ **First load may take 30-60 seconds** as the free tier backend wakes from sleep mode. Subsequent requests will be faster.

### Deployment Notes
- Both services are connected to the GitHub repository for automatic deployments
- Environment variables are configured in each platform's dashboard
- The frontend is configured to connect to the Render backend URL
- Free tier limitations apply (backend sleep after inactivity, rate limits)

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Health Check
- **GET** `/api/health`
  - Returns server status
  - Response: `{ "status": "OK" }`

### Inventory Items

#### Get All Items
- **GET** `/api/inventory`
  - Returns all inventory items
  - Response: `InventoryItem[]`

#### Get Single Item
- **GET** `/api/inventory/:id`
  - Returns a single inventory item by ID
  - Response: `InventoryItem`
  - Error: `404` if item not found

#### Create New Item
- **POST** `/api/inventory`
  - Creates a new inventory item
  - Body: `{ sku, name, category, quantity, reorderPoint, price }`
  - Response: `InventoryItem` (201 Created)
  - Error: `400` for validation errors

#### Update Item
- **PUT** `/api/inventory/:id`
  - Updates an existing inventory item
  - Body: Partial `InventoryItem` fields
  - Response: `InventoryItem`
  - Error: `404` if item not found

#### Delete Item
- **DELETE** `/api/inventory/:id`
  - Deletes an inventory item
  - Response: `{ message: "Item deleted successfully" }`
  - Error: `404` if item not found

### Data Model

```typescript
interface InventoryItem {
  id: string;                    // Auto-generated
  sku: string;                    // Stock Keeping Unit
  name: string;                   // Item name
  category: string;               // Item category
  quantity: number;               // Current quantity
  reorderPoint: number;          // Reorder threshold
  price: number;                 // Item price
  lastUpdated: Date;             // Auto-updated
  status: 'in-stock' | 'low-stock' | 'out-of-stock'; // Auto-calculated
}
```

### Status Calculation

- **in-stock**: `quantity > reorderPoint`
- **low-stock**: `quantity <= reorderPoint && quantity > 0`
- **out-of-stock**: `quantity === 0`

## 🔧 Environment Variables

### Backend

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory-management
```

**Note:** Currently using in-memory storage. MongoDB URI is optional for future database integration.

### Frontend

No environment variables required for basic setup. The API URL is hardcoded to `http://localhost:5000/api/inventory`.

For production, you may want to create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📝 Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Search & Filter
- **Real-time Search**: Filter items by name or SKU as you type
- **Status Filter**: Filter by inventory status (All, In Stock, Low Stock, Out of Stock)
- **Category Filter**: Filter by item category (dynamically populated)
- **Combined Filters**: All filters work together for precise results
- **Item Count**: Shows "Showing X of Y items" based on active filters
- **Clear Filters**: One-click button to reset all filters

### UI Components
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Status Badges**: Color-coded badges (green/yellow/red)
- **Loading States**: Spinner while fetching data
- **Error Handling**: User-friendly error messages with retry option
- **Currency Formatting**: Indian Rupee (INR) formatting
- **Date Formatting**: Human-readable date display

## 🐛 Troubleshooting

### Backend not starting
- Check if port 5000 is already in use
- Verify all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`

### Frontend not connecting to backend
- Ensure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify API URL in `frontend/src/lib/api.ts`

### Port already in use
- Backend: Change `PORT` in `backend/src/server.ts` or `.env`
- Frontend: Next.js will automatically use the next available port (3001, 3002, etc.)

## 📸 Screenshots

_Add screenshots of your application here_

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Express.js for the robust backend framework
- Tailwind CSS for the utility-first CSS framework

---

**Happy Coding! 🚀**

