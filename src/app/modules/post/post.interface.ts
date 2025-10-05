import { Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  image?: string;
  publish_on: Date;
  is_featured?: boolean;
  tags?: string[];
  category: Types.ObjectId;
  author: Types.ObjectId;
  summary: string;
  meta_description?: string;
  blog_content: string;
  comments?: Types.ObjectId[];
  likes?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
