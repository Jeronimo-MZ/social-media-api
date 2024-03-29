import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { injectable, inject } from "tsyringe";
import { IPost } from "../infra/mongoose/models/Post";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class ShowPostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,
    ) {}

    async execute(post_id: string): Promise<IPost> {
        const post = await this.postsRepository.findById(post_id);
        if (!post) {
            throw new AppError("Post not found!", HttpStatusCode.NOT_FOUND);
        }

        return post;
    }
}

export { ShowPostService };
