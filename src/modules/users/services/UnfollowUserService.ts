import { IFollowUserDTO } from "@modules/users/dtos/IFollowUserDTO";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class UnfollowUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({
        user_id,
        followed_user_id,
    }: IFollowUserDTO): Promise<void> {
        if (user_id === followed_user_id) {
            throw new AppError("You cannot unfollow yourself");
        }

        const currentUser = await this.usersRepository.findById(user_id);
        const followedUser = await this.usersRepository.findById(
            followed_user_id,
        );

        if (!currentUser) throw new AppError("User Not found", 404);

        if (!followedUser) throw new AppError("Followed user Not found", 404);

        if (!currentUser.followings.includes(followed_user_id)) {
            throw new AppError("You do not follow this user", 403);
        }

        await this.usersRepository.unfollowUser({ followed_user_id, user_id });
    }
}

export { UnfollowUserService };
