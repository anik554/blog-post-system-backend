"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const comment_model_1 = require("./comment.model");
const createComment = async (payload) => {
    const existingComment = await comment_model_1.Comment.findOne({ text: payload.text });
    if (existingComment) {
        throw new Error("Comment already exists.");
    }
    const comment = await comment_model_1.Comment.create(payload);
    return comment;
};
const updateComment = async (id, payload, verifiedToken) => {
    const existingComment = await comment_model_1.Comment.findById(id);
    if (!existingComment) {
        throw new Error("Comment Not Found.");
    }
    if (verifiedToken.role !== "ADMIN" &&
        existingComment.author.toString() !== verifiedToken._id) {
        throw new Error("You are not allowed to update this comment.");
    }
    if (payload.title) {
        const duplicateComment = await comment_model_1.Comment.findOne({
            title: payload.title,
            _id: { $ne: id },
        });
        if (duplicateComment) {
            throw new Error("A Comment with this title already exists.");
        }
    }
    const updatedComment = await comment_model_1.Comment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedComment;
};
const getAllComment = async () => {
    const comments = await comment_model_1.Comment.find({});
    const totalComments = await comment_model_1.Comment.countDocuments();
    return {
        data: comments,
        meta: {
            total: totalComments,
        },
    };
};
const deleteComment = async (id) => {
    const existingComment = await comment_model_1.Comment.findById(id);
    if (!existingComment) {
        throw new Error("Comment Not Found.");
    }
    await comment_model_1.Comment.findByIdAndDelete(id);
    return null;
};
exports.CommentServices = {
    createComment,
    getAllComment,
    deleteComment,
    updateComment,
};
