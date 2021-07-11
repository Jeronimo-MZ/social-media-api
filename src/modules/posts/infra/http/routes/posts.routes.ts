import { Router } from "express";
import { PostLikesController } from "../controllers/PostLikesController";
import { PostsController } from "../controllers/PostsController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/EnsureAuthenticated";

const postsRouter = Router();
const postsController = new PostsController();
const postLikesController = new PostLikesController();

postsRouter.post("/", ensureAuthenticated, postsController.create);
postsRouter.put("/:post_id", ensureAuthenticated, postsController.update);
postsRouter.patch(
    "/:post_id/like",
    ensureAuthenticated,
    postLikesController.toggleLike,
);
postsRouter.delete("/:post_id", ensureAuthenticated, postsController.delete);

export { postsRouter };
