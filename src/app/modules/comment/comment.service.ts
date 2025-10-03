import { JwtPayload } from "jsonwebtoken";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createComment = async (payload: Partial<IComment>) => {
  const existingComment = await Comment.findOne({ text: payload.text });
  if (existingComment) {
    throw new Error("Comment already exists.");
  }
  const comment = await Comment.create(payload);
  return comment;
};

const updateComment = async (
  id: string,
  payload: Partial<IComment>,
  verifiedToken: JwtPayload
) => {
  const existingComment = await Comment.findById(id);

  if (!existingComment) {
    throw new Error("Comment Not Found.");
  }
  if (
    verifiedToken.role !== "ADMIN" &&
    existingComment.author.toString() !== verifiedToken._id
  ) {
    throw new Error("You are not allowed to update this comment.");
  }

  if (payload.title) {
    const duplicateComment = await Comment.findOne({
      title: payload.title,
      _id: { $ne: id },
    });

    if (duplicateComment) {
      throw new Error("A Comment with this title already exists.");
    }
  }

  const updatedComment = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedComment;
};

const getAllComment = async () => {
  const comments = await Comment.find({});
  const totalComments = await Comment.countDocuments();

  return {
    data: comments,
    meta: {
      total: totalComments,
    },
  };
};

const deleteComment = async (id: string) => {
  const existingComment = await Comment.findById(id);

  if (!existingComment) {
    throw new Error("Comment Not Found.");
  }
  await Comment.findByIdAndDelete(id);
  return null;
};

export const CommentServices = {
  createComment,
  getAllComment,
  deleteComment,
  updateComment,
};
