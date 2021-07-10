import { Router } from "express";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import { userRouter } from "@modules/users/infra/http/routes/users.routes";
import { postsRouter } from "@modules/posts/infra/http/routes/posts.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);
router.use("/posts", postsRouter);

export { router };
