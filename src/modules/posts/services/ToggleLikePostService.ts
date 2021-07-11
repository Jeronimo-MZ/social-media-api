import { injectable, inject } from "tsyringe";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { IToggleLikePostDTO } from "../dtos/IToggleLikePostDTO";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

@injectable()
class ToggleLikePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ post_id, user_id }: IToggleLikePostDTO): Promise<string> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 403);
        }

        if (post.likes.includes(String(user_id))) {
            await this.postsRepository.removeLike({
                post_id,
                user_id,
            });
            return "The post has been disliked";
        } else {
            await this.postsRepository.addLike({
                post_id,
                user_id,
            });

            return "The post has been liked";
        }
    }
}

export { ToggleLikePostService };
