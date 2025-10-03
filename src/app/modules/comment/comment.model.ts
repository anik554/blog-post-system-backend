import { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Comment = model<IComment>("Comment", commentSchema);
