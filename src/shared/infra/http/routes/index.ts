import { Router } from "express";
import sessionsRouter from "../../../../modules/users/infra/http/routes/sessions.routes";
import { userRouter } from "../../../../modules/users/infra/http/routes/users.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/sessions", sessionsRouter);

export { router };
