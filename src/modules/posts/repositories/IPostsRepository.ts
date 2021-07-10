import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPost } from "@modules/posts/infra/mongoose/models/Post";
import { IDeletePostDTO } from "../dtos/IDeletePostDTO";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";

export interface IPostsRepository {
    create(data: ICreatePostDTO): Promise<IPost>;
    update(data: IUpdatePostDTO): Promise<IPost | undefined>;
    delete(post_id: string): Promise<void>;
    findById(id: string): Promise<IPost | undefined>;
}
