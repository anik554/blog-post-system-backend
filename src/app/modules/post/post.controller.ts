/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { PostServices } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// Import or define the authenticated request type
interface AuthenticatedRequest extends Request {
  user: any;
}

const createPost = catchAsync(async (req: Request, res: Response) => {
  const image = req.file ? `/uploads/${req.file.filename}` : null; 
  const payload = { ...req.body, image };
  
  const post = await PostServices.createPost(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Post Created Successfully",
    data: post,
  });
});

const updatePost = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    // Type assertion for authenticated request
    const verifiedToken = (req as AuthenticatedRequest).user;

    const payload = { ...req.body, ...(image && { image }) };

    const post = await PostServices.updatePost(postId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Updated Successfully",
      data: post,
    });
  }
);

const getAllPost = catchAsync(
  async (req: Request, res: Response) => {
    const post = await PostServices.getAllPost();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Posts Retrieved Successfully",
      data: post.data,
      meta: post.meta,
    });
  }
);

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const result = await PostServices.deletePost(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Post Deleted Successfully",
        data: result,
    });
});

export const PostControllers = {
  createPost,
  getAllPost,
  deletePost,
  updatePost
};