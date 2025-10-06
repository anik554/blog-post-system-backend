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
exports.CommentServices = void 0;
const comment_model_1 = require("./comment.model");
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingComment = yield comment_model_1.Comment.findOne({ text: payload.text });
    if (existingComment) {
        throw new Error("Comment already exists.");
    }
    const comment = yield comment_model_1.Comment.create(payload);
    return comment;
});
const updateComment = (id, payload, verifiedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const existingComment = yield comment_model_1.Comment.findById(id);
    if (!existingComment) {
        throw new Error("Comment Not Found.");
    }
    if (verifiedToken.role !== "ADMIN" &&
        existingComment.author.toString() !== verifiedToken._id) {
        throw new Error("You are not allowed to update this comment.");
    }
    if (payload.title) {
        const duplicateComment = yield comment_model_1.Comment.findOne({
            title: payload.title,
            _id: { $ne: id },
        });
        if (duplicateComment) {
            throw new Error("A Comment with this title already exists.");
        }
    }
    const updatedComment = yield comment_model_1.Comment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedComment;
});
const getAllComment = () => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.Comment.find({});
    const totalComments = yield comment_model_1.Comment.countDocuments();
    return {
        data: comments,
        meta: {
            total: totalComments,
        },
    };
});
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingComment = yield comment_model_1.Comment.findById(id);
    if (!existingComment) {
        throw new Error("Comment Not Found.");
    }
    yield comment_model_1.Comment.findByIdAndDelete(id);
    return null;
});
exports.CommentServices = {
    createComment,
    getAllComment,
    deleteComment,
    updateComment,
};
