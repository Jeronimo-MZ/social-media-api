import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IPostsRepository } from "../repositories/IPostsRepository";

@injectable()
class CreatePostService {
    constructor(
        @inject("PostsRepository")
        private postsRepository: IPostsRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(data: ICreatePostDTO) {
        const user = await this.usersRepository.findById(data.user_id);

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        const post = await this.postsRepository.create(data);
        return post;
    }
}

export { CreatePostService };
