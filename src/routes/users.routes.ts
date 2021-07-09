import { Router } from "express";
import { FollowersController } from "../controllers/FollowersController";
import { UserPasswordController } from "../controllers/UserPasswordController";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/EnsureAuthenticated";
("../middlewares/EnsureAuthenticated");

const userRouter = Router();
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();
const followersController = new FollowersController();

userRouter.get("/me", ensureAuthenticated, usersController.show);
userRouter.post("/", usersController.create);
userRouter.patch("/", ensureAuthenticated, usersController.update);
userRouter.patch(
    "/password",
    ensureAuthenticated,
    userPasswordController.update
);

userRouter.post(
    "/:followed_user_id/follow",
    ensureAuthenticated,
    followersController.create
);

userRouter.delete(
    "/:followed_user_id/unfollow",
    ensureAuthenticated,
    followersController.delete
);

userRouter.delete("/", ensureAuthenticated, usersController.delete);

export { userRouter };
