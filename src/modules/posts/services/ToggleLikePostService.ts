import { injectable, inject } from "tsyringe";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { IToggleLikePostDTO } from "../dtos/IToggleLikePostDTO";
import { AppError } from "@shared/errors/AppError";
import { IPost } from "../infra/mongoose/models/Post";

@injectable()
class ToggleLikePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,
    ) {}

    async execute({ post_id, user_id }: IToggleLikePostDTO): Promise<string> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        if (post.likes.includes(String(user_id))) {
            await this.postsRepository.removeLike({
                post_id,
                user_id,
            });
            return "The post has been liked";
        } else {
            await this.postsRepository.addLike({
                post_id,
                user_id,
            });

            return "The post has been disliked";
        }
    }
}

export { ToggleLikePostService };
