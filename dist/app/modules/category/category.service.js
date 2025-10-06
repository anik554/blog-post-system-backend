"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategory = async (payload) => {
    const existingCategory = await category_model_1.Category.findOne({ name: payload.name });
    if (existingCategory) {
        throw new Error("Category already exists.");
    }
    const category = await category_model_1.Category.create(payload);
    return category;
};
const getAllCategories = async () => {
    const categories = await category_model_1.Category.find({});
    const totalCategories = await category_model_1.Category.countDocuments();
    return {
        data: categories,
        meta: {
            total: totalCategories,
        },
    };
};
const updateCategory = async (id, payload) => {
    const existingCategory = await category_model_1.Category.findById(id);
    if (!existingCategory) {
        throw new Error("Category Not Found.");
    }
    const duplicateCategory = await category_model_1.Category.findOne({ name: payload.name });
    if (duplicateCategory) {
        throw new Error("A Category with this name already exists.");
    }
    const updateCategory = await category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updateCategory;
};
const deleteCategory = async (id) => {
    const existingCategory = await category_model_1.Category.findById(id);
    if (!existingCategory) {
        throw new Error("Category Not Found.");
    }
    await category_model_1.Category.findByIdAndDelete(id);
    return null;
};
exports.CategoryServices = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
