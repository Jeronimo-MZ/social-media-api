import { Router } from "express";
import { UserPasswordController } from "../controllers/UserPasswordController";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/EnsureAuthenticated";
("../middlewares/EnsureAuthenticated");

const userRouter = Router();
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();

userRouter.get("/me", ensureAuthenticated, usersController.show);
userRouter.post("/", usersController.create);
userRouter.patch("/", ensureAuthenticated, usersController.update);
userRouter.patch(
    "/password",
    ensureAuthenticated,
    userPasswordController.update
);
userRouter.delete("/", ensureAuthenticated, usersController.delete);

export { userRouter };
