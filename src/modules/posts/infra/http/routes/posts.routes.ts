import { Router } from "express";
import { PostsController } from "../controllers/PostsController";

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post("/", postsController.create);
postsRouter.put("/:post_id", postsController.update);
postsRouter.delete("/:post_id", postsController.delete);

export { postsRouter };
