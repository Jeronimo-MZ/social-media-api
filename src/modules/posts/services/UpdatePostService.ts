import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { injectable, inject } from "tsyringe";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";
import { IPost } from "../infra/mongoose/models/Post";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class UpdatePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,
    ) {}

    async execute({
        author_id,
        post_id,
        content,
        image,
    }: IUpdatePostDTO): Promise<IPost | undefined> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError("Post not found!", HttpStatusCode.NOT_FOUND);
        }

        if (post.author_id !== author_id) {
            throw new AppError(
                "You can update only your own posts",
                HttpStatusCode.FORBIDDEN,
            );
        }

        const updatedPost = await this.postsRepository.update({
            post_id,
            content,
            author_id,
            image,
        });

        return updatedPost;
    }
}

export { UpdatePostService };
