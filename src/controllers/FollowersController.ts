import { FollowUserService } from "../services/FollowUserService";
import { Request, Response } from "express";
import { UnfollowUserService } from "../services/UnfollowUserService";

class FollowersController {
    async create(request: Request, response: Response): Promise<Response> {
        const followUser = new FollowUserService();
        const { user_id } = request.body;
        const { followed_user_id } = request.params;

        await followUser.execute({ user_id, followed_user_id });
        return response.status(203).send();
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const unfollowUser = new UnfollowUserService();
        const { user_id } = request.body;
        const { followed_user_id } = request.params;

        await unfollowUser.execute({ user_id, followed_user_id });
        return response.status(203).send();
    }
}

export { FollowersController };
