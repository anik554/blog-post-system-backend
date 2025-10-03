
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Category Created Successfully",
      data: category,
    });
  }
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const category = await CategoryServices.getAllCategories();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Category Retrieved Successfully",
      data: category.data,
      meta: category.meta,
    });
  }
);

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.deleteCategory(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Category Deleted Successfully",
        data: result,
    });
});

export const CategoryControllers ={
createCategory,
getAllCategories,
deleteCategory
}