import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { injectable, inject } from "tsyringe";
import { IDeletePostDTO } from "../dtos/IDeletePostDTO";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class DeletePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,
    ) {}

    async execute({ author_id, post_id }: IDeletePostDTO): Promise<void> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError("Post not found!", HttpStatusCode.NOT_FOUND);
        }

        if (post.author_id !== author_id) {
            throw new AppError(
                "You can delete only your own posts",
                HttpStatusCode.FORBIDDEN,
            );
        }

        await this.postsRepository.delete(post_id);
    }
}

export { DeletePostService };
