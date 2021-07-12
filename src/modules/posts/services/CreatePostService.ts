import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { injectable, inject } from "tsyringe";
import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IPost } from "../infra/mongoose/models/Post";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class CreatePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    async execute(data: ICreatePostDTO): Promise<IPost> {
        const user = await this.usersRepository.findById(data.user_id);

        if (!user) {
            throw new AppError("User not found!", HttpStatusCode.UNAUTHORIZED);
        }

        const post = await this.postsRepository.create(data);
        return post;
    }
}

export { CreatePostService };
