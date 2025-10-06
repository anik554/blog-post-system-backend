"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const category_service_1 = require("./category.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const createCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const category = await category_service_1.CategoryServices.createCategory(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Category Created Successfully",
        data: category,
    });
});
const getAllCategories = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const category = await category_service_1.CategoryServices.getAllCategories();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Category Retrieved Successfully",
        data: category.data,
        meta: category.meta,
    });
});
const deleteCategory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await category_service_1.CategoryServices.deleteCategory(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category Deleted Successfully",
        data: result,
    });
});
exports.CategoryControllers = {
    createCategory,
    getAllCategories,
    deleteCategory
};
