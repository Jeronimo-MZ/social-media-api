import { ToggleLikePostService } from "@modules/posts/services/ToggleLikePostService";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PostLikesController {
    async toggleLike(request: Request, response: Response): Promise<Response> {
        const toggleLikePost = container.resolve(ToggleLikePostService);
        return response.status(HttpStatusCode.OK).send(
            await toggleLikePost.execute({
                post_id: request.params.post_id,
                user_id: request.body.user_id,
            }),
        );
    }
}

export { PostLikesController };
