import { Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
}