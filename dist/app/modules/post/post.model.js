"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: false },
    publish_on: { type: Date, required: true },
    is_featured: { type: Boolean, default: false },
    tags: [{ type: String, trim: true }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    summary: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    meta_description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 160,
    },
    blog_content: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
