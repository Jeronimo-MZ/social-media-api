import { Router } from "express";
import sessionsRouter from "./sessions.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);

export { router };
