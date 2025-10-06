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
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield post_model_1.Post.findOne({ title: payload.title });
    if (existingPost) {
        throw new Error("Post already exists.");
    }
    const post = yield post_model_1.Post.create(payload);
    return post;
});
const updatePost = (id, payload, verifiedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield post_model_1.Post.findById(id);
    if (!existingPost) {
        throw new Error("Post Not Found.");
    }
    if (verifiedToken.role !== "ADMIN" &&
        existingPost.author.toString() !== verifiedToken._id) {
        throw new Error("You are not allowed to update this post.");
    }
    if (payload.title) {
        const duplicatePost = yield post_model_1.Post.findOne({
            title: payload.title,
            _id: { $ne: id },
        });
        if (duplicatePost) {
            throw new Error("A Post with this title already exists.");
        }
    }
    const updatedPost = yield post_model_1.Post.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedPost;
});
const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({});
    const totalposts = yield post_model_1.Post.countDocuments();
    return {
        data: posts,
        meta: {
            total: totalposts,
        },
    };
});
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield post_model_1.Post.findById(id);
    if (!existingPost) {
        throw new Error("Post Not Found.");
    }
    yield post_model_1.Post.findByIdAndDelete(id);
    return null;
});
exports.PostServices = {
    createPost,
    getAllPost,
    deletePost,
    updatePost
};
