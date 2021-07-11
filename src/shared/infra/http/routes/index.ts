import { Router } from "express";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import { userRouter } from "@modules/users/infra/http/routes/users.routes";
import { postsRouter } from "@modules/posts/infra/http/routes/posts.routes";
import { timelineRouter } from "@modules/posts/infra/http/routes/timeline.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);
router.use("/posts", postsRouter);
router.use("/timeline", timelineRouter);

export { router };
