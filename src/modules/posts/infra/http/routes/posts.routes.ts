import { Router } from "express";
import { PostLikesController } from "../controllers/PostLikesController";
import { PostsController } from "../controllers/PostsController";

const postsRouter = Router();
const postsController = new PostsController();
const postLikesController = new PostLikesController();

postsRouter.post("/", postsController.create);
postsRouter.put("/:post_id", postsController.update);
postsRouter.patch("/:post_id/like", postLikesController.toggleLike);
postsRouter.delete("/:post_id", postsController.delete);

export { postsRouter };
