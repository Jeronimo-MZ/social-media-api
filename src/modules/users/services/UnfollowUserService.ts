import { IFollowUserDTO } from "@modules/users/dtos/IFollowUserDTO";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
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
            throw new AppError(
                "You cannot unfollow yourself",
                HttpStatusCode.FORBIDDEN,
            );
        }

        const currentUser = await this.usersRepository.findById(user_id);
        const followedUser = await this.usersRepository.findById(
            followed_user_id,
        );

        if (!currentUser)
            throw new AppError("User Not found", HttpStatusCode.UNAUTHORIZED);

        if (!followedUser)
            throw new AppError(
                "Followed user Not found",
                HttpStatusCode.NOT_FOUND,
            );

        if (!currentUser.followings.includes(followed_user_id)) {
            throw new AppError(
                "You do not follow this user",
                HttpStatusCode.FORBIDDEN,
            );
        }

        await this.usersRepository.unfollowUser({ followed_user_id, user_id });
    }
}

export { UnfollowUserService };
