import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { inject, injectable } from "tsyringe";
import { IPost } from "../infra/mongoose/models/Post";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class ShowUserTimelineService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}
    async execute(user_id: string): Promise<IPost[]> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found!", HttpStatusCode.NOT_FOUND);
        }

        const userPosts = await this.postsRepository.findAllByAuthorId(user_id);

        const userFriendsPosts = await Promise.all(
            user.followings.map(friend_id =>
                this.postsRepository.findAllByAuthorId(friend_id),
            ),
        );

        const posts = userPosts.concat(...userFriendsPosts);

        return posts;
    }
}

export { ShowUserTimelineService };
