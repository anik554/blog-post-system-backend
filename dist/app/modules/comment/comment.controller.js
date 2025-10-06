"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const comment_service_1 = require("./comment.service");
const createComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const comment = await comment_service_1.CommentServices.createComment(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Comment Post Successfully",
        data: comment,
    });
});
const updateComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const commentId = req.params.id;
    const payload = req.body;
    const verifiedToken = res.locals.user;
    const comment = await comment_service_1.CommentServices.updateComment(commentId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Comment Updated Successfully",
        data: comment,
    });
});
const getAllComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const comment = await comment_service_1.CommentServices.getAllComment();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Comments Retrieved Successfully",
        data: comment.data,
        meta: comment.meta,
    });
});
const deleteComment = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await comment_service_1.CommentServices.deleteComment(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comment Deleted Successfully",
        data: result,
    });
});
exports.CommentControllers = {
    createComment,
    getAllComment,
    deleteComment,
    updateComment
};
