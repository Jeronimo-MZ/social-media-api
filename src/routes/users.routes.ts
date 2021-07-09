import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/EnsureAuthenticated";
("../middlewares/EnsureAuthenticated");

const userRouter = Router();
const usersController = new UsersController();

userRouter.post("/", usersController.create);
userRouter.patch("/", ensureAuthenticated, usersController.update);

export { userRouter };
