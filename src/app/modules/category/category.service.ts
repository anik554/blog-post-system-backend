import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: Partial<ICategory>) => {
  const existingCategory = await Category.findOne({ name: payload.name });
  if (existingCategory) {
    throw new Error("Category already exists.");
  }
  const category = await Category.create(payload);
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.find({});
  const totalCategories = await Category.countDocuments();

  return {
    data: categories,
    meta: {
      total: totalCategories,
    },
  };
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new Error("Category Not Found.");
  }

  const duplicateCategory = await Category.findOne({ name: payload.name });

  if (duplicateCategory) {
    throw new Error("A Category with this name already exists.");
  }

  const updateCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updateCategory;
};

const deleteCategory = async (id: string) => {
  const existingCategory = await Category.findById(id);
  if (!existingCategory) {
    throw new Error("Category Not Found.");
  }
  await Category.findByIdAndDelete(id);
  return null;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
