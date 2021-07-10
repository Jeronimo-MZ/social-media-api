import { Router } from "express";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import { userRouter } from "@modules/users/infra/http/routes/users.routes";
import { postsRouter } from "@modules/posts/infra/http/routes/posts.routes";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/EnsureAuthenticated";

const router = Router();

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);
router.use("/posts", ensureAuthenticated, postsRouter);

export { router };
