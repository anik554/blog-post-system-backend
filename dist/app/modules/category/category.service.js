"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield category_model_1.Category.findOne({ name: payload.name });
    if (existingCategory) {
        throw new Error("Category already exists.");
    }
    const category = yield category_model_1.Category.create(payload);
    return category;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.Category.find({});
    const totalCategories = yield category_model_1.Category.countDocuments();
    return {
        data: categories,
        meta: {
            total: totalCategories,
        },
    };
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield category_model_1.Category.findById(id);
    if (!existingCategory) {
        throw new Error("Category Not Found.");
    }
    const duplicateCategory = yield category_model_1.Category.findOne({ name: payload.name });
    if (duplicateCategory) {
        throw new Error("A Category with this name already exists.");
    }
    const updateCategory = yield category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updateCategory;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield category_model_1.Category.findById(id);
    if (!existingCategory) {
        throw new Error("Category Not Found.");
    }
    yield category_model_1.Category.findByIdAndDelete(id);
    return null;
});
exports.CategoryServices = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
