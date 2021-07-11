import ensureAuthenticated from "@modules/users/infra/http/middlewares/EnsureAuthenticated";
import { Router } from "express";
import { TimelineController } from "../controllers/TimelineController";

const timelineRouter = Router();
const timelineController = new TimelineController();

timelineRouter.get("/all", ensureAuthenticated, timelineController.show);

export { timelineRouter };
