import { Types } from "mongoose";

export interface IComment extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  author: string;
}