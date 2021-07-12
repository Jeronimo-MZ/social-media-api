import { FollowUserService } from "@modules/users/services/FollowUserService";
import { Request, Response } from "express";
import { UnfollowUserService } from "@modules/users/services/UnfollowUserService";
import { container } from "tsyringe";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

class FollowersController {
    async create(request: Request, response: Response): Promise<Response> {
        const followUser = container.resolve(FollowUserService);
        const { user_id } = request.body;
        const { followed_user_id } = request.params;

        await followUser.execute({ user_id, followed_user_id });
        return response.status(HttpStatusCode.NO_CONTENT).send();
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const unfollowUser = container.resolve(UnfollowUserService);
        const { user_id } = request.body;
        const { followed_user_id } = request.params;

        await unfollowUser.execute({ user_id, followed_user_id });
        return response.status(HttpStatusCode.NO_CONTENT).send();
    }
}

export { FollowersController };
