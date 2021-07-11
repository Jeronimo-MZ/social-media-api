import { ShowUserTimelineService } from "@modules/posts/services/ShowUserTimelineService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class TimelineController {
    async show(request: Request, response: Response): Promise<Response> {
        const showTimeline = container.resolve(ShowUserTimelineService);
        return response.json(await showTimeline.execute(request.body.user_id));
    }
}

export { TimelineController };
