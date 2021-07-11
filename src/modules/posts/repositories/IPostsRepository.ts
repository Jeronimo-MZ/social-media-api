import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPost } from "@modules/posts/infra/mongoose/models/Post";
import { IToggleLikePostDTO } from "../dtos/IToggleLikePostDTO";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";

export interface IPostsRepository {
    create(data: ICreatePostDTO): Promise<IPost>;
    update(data: IUpdatePostDTO): Promise<IPost | undefined>;
    delete(post_id: string): Promise<void>;
    findById(id: string): Promise<IPost | undefined>;
    addLike(data: IToggleLikePostDTO): Promise<void>;
    removeLike(data: IToggleLikePostDTO): Promise<void>;
}
