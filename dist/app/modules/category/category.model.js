"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const category_interface_1 = require("./category.interface");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: Object.values(category_interface_1.CategoryType),
    },
    description: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
