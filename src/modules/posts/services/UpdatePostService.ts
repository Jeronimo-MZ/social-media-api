import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class UpdatePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository
    ) {}

    async execute({ author_id, post_id, content }: IUpdatePostDTO) {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError("Post not found!", 404);
        }

        if (post.author_id !== author_id) {
            throw new AppError("You can update only your own posts", 403);
        }

        const updatedPost = await this.postsRepository.update({
            post_id,
            content,
            author_id,
        });

        return updatedPost;
    }
}

export { UpdatePostService };
