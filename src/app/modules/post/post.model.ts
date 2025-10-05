import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },

    image: { type: String, required: false },

    publish_on: { type: Date, required: true },

    is_featured: { type: Boolean, default: false },

    tags: [{ type: String, trim: true }],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    meta_description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 160,
    },

    blog_content: {
      type: String,
      required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }

);

export const Post = model<IPost>("Post", postSchema);
