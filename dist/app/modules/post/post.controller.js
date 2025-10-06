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
exports.PostControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const post_service_1 = require("./post.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const createPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const payload = Object.assign(Object.assign({}, req.body), { image });
    const post = yield post_service_1.PostServices.createPost(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Post Created Successfully",
        data: post,
    });
}));
const updatePost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const verifiedToken = req.user;
    const payload = Object.assign(Object.assign({}, req.body), (image && { image }));
    const post = yield post_service_1.PostServices.updatePost(postId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Post Updated Successfully",
        data: post,
    });
}));
const getAllPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_service_1.PostServices.getAllPost();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Posts Retrieved Successfully",
        data: post.data,
        meta: post.meta,
    });
}));
const deletePost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.deletePost(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Post Deleted Successfully",
        data: result,
    });
}));
exports.PostControllers = {
    createPost,
    getAllPost,
    deletePost,
    updatePost
};
