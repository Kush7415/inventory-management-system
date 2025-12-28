import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './Category';

export interface IItem extends Document {
  name: string;
  description?: string;
  category: mongoose.Types.ObjectId | ICategory;
  quantity: number;
  price: number;
  sku?: string;
  reorderLevel: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },
    reorderLevel: {
      type: Number,
      required: [true, 'Reorder level is required'],
      min: [0, 'Reorder level cannot be negative'],
      default: 10,
    },
    status: {
      type: String,
      enum: ['in_stock', 'low_stock', 'out_of_stock'],
      default: 'in_stock',
    },
  },
  {
    timestamps: true,
  }
);

// Update status based on quantity before saving
ItemSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out_of_stock';
  } else if (this.quantity <= this.reorderLevel) {
    this.status = 'low_stock';
  } else {
    this.status = 'in_stock';
  }
  next();
});

export default mongoose.model<IItem>('Item', ItemSchema);

