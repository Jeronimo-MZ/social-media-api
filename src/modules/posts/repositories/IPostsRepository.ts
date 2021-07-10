import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPost } from "@modules/posts/infra/mongoose/models/Post";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";

export interface IPostsRepository {
    create(data: ICreatePostDTO): Promise<IPost>;
    update(data: IUpdatePostDTO): Promise<IPost | undefined>;
    findById(id: string): Promise<IPost | undefined>;
}
