import { Router } from "express";
import { userRouter } from "./UserRouter";

const router = Router();

router.use("/users", userRouter);

export { router };
