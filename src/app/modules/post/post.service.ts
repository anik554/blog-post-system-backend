import { JwtPayload } from "jsonwebtoken";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (payload: Partial<IPost>) => {
  const existingPost = await Post.findOne({ title: payload.title });
  if (existingPost) {
    throw new Error("Post already exists.");
  }
  const post = await Post.create(payload);
  return post;
};

const updatePost = async (id: string, payload: Partial<IPost>,verifiedToken:JwtPayload) => {
  const existingPost = await Post.findById(id);

  if (!existingPost) {
    throw new Error("Post Not Found.");
  }
   if (
    verifiedToken.role !== "ADMIN" &&
    existingPost.author.toString() !== verifiedToken._id
  ) {
    throw new Error("You are not allowed to update this post.");
  }

  if (payload.title) {
    const duplicatePost = await Post.findOne({
      title: payload.title,
      _id: { $ne: id },
    });

    if (duplicatePost) {
      throw new Error("A Post with this title already exists.");
    }
  }

  const updatedPost = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedPost;
};


const getAllPost = async () => {
  const posts = await Post.find({});
  const totalposts = await Post.countDocuments();

  return {
    data: posts,
    meta: {
      total: totalposts,
    },
  };
};

const deletePost = async (id:string) => {
  await Post.findByIdAndDelete(id)
  return null;
};


export const PostServices = {
  createPost,
  getAllPost,
  deletePost,
  updatePost
};
