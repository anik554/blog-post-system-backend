import { model, Schema } from "mongoose";
import { CategoryType, ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(CategoryType),
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = model<ICategory>("Category", categorySchema);
