import ensureAuthenticated from "@modules/users/infra/http/middlewares/EnsureAuthenticated";
import { Router } from "express";
import { PostsController } from "../controllers/PostsController";

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post("/", ensureAuthenticated, postsController.create);

export { postsRouter };
