"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const createPost = async (payload) => {
    const existingPost = await post_model_1.Post.findOne({ title: payload.title });
    if (existingPost) {
        throw new Error("Post already exists.");
    }
    const post = await post_model_1.Post.create(payload);
    return post;
};
const updatePost = async (id, payload, verifiedToken) => {
    const existingPost = await post_model_1.Post.findById(id);
    if (!existingPost) {
        throw new Error("Post Not Found.");
    }
    if (verifiedToken.role !== "ADMIN" &&
        existingPost.author.toString() !== verifiedToken._id) {
        throw new Error("You are not allowed to update this post.");
    }
    if (payload.title) {
        const duplicatePost = await post_model_1.Post.findOne({
            title: payload.title,
            _id: { $ne: id },
        });
        if (duplicatePost) {
            throw new Error("A Post with this title already exists.");
        }
    }
    const updatedPost = await post_model_1.Post.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedPost;
};
const getAllPost = async () => {
    const posts = await post_model_1.Post.find({});
    const totalposts = await post_model_1.Post.countDocuments();
    return {
        data: posts,
        meta: {
            total: totalposts,
        },
    };
};
const deletePost = async (id) => {
    const existingPost = await post_model_1.Post.findById(id);
    if (!existingPost) {
        throw new Error("Post Not Found.");
    }
    await post_model_1.Post.findByIdAndDelete(id);
    return null;
};
exports.PostServices = {
    createPost,
    getAllPost,
    deletePost,
    updatePost
};
