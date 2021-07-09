import { IFollowUserDTO } from "../dtos/IFollowUserDTO";
import { AppError } from "../../../shared/errors/AppError";
import User from "../infra/mongoose/models/User";

class FollowUserService {
    public async execute({ user_id, followed_user_id }: IFollowUserDTO) {
        if (user_id === followed_user_id) {
            throw new AppError("You cannot follow yourself");
        }

        const currentUser = await User.findById(user_id);
        const followedUser = await User.findById(followed_user_id);

        if (!currentUser) throw new AppError("User Not found", 404);

        if (!followedUser) throw new AppError("Followed user Not found", 404);

        if (currentUser.followings?.includes(followed_user_id)) {
            if (!followedUser.followers?.includes(user_id)) {
                await followedUser.updateOne({ $push: { followers: user_id } });
            }
            throw new AppError("You already follow this user", 403);
        }

        if (followedUser.followers?.includes(user_id)) {
            if (!currentUser.followings?.includes(followed_user_id)) {
                await currentUser.updateOne({
                    $push: { followings: followed_user_id },
                });
            }
            throw new AppError("You already follow this user", 403);
        }

        await currentUser.updateOne({
            $push: { followings: followed_user_id },
        });

        await followedUser.updateOne({ $push: { followers: user_id } });
    }
}

export { FollowUserService };
