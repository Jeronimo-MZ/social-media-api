import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPost } from "@modules/posts/infra/mongoose/models/Post";

export interface IPostsRepository {
    create(data: ICreatePostDTO): Promise<IPost>;
}
