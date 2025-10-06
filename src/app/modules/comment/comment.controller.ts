import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { CommentServices } from "./comment.service";
import { JwtPayload } from "jsonwebtoken";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const comment = await CommentServices.createComment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Comment Post Successfully",
    data: comment,
  });
});

const updateComment = catchAsync(
  async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const payload = req.body;
    const verifiedToken = (req as JwtPayload).user;

    const comment = await CommentServices.updateComment(commentId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment Updated Successfully",
      data: comment,
    });
  }
);


const getAllComment = catchAsync(
  async (req: Request, res: Response) => {
    const comment = await CommentServices.getAllComment();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comments Retrieved Successfully",
      data: comment.data,
      meta: comment.meta,
    });
  }
);

const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const result = await CommentServices.deleteComment(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Comment Deleted Successfully",
        data: result,
    });
});

export const CommentControllers = {
  createComment,
  getAllComment,
  deleteComment,
  updateComment
};
