import { Request, Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors";

class UserController {
  static async get_user(req: Request, res: Response, next: NextFunction) {
    try {
        return res.send("Hello on my page!");
    } catch (error) {
        console.log(error)
        return ApiError.internal("Server error!")
    }
  }
}

export default UserController;
