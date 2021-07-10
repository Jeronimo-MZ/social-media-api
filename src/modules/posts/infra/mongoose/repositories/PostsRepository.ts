import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import Post, { IPost } from "../models/Post";

class PostsRepository implements IPostsRepository {
    async create({ user_id, content }: ICreatePostDTO): Promise<IPost> {
        const newPost = new Post({
            author_id: user_id,
            content,
        });

        const post = await newPost.save();
        return post.toObject();
    }
}

export { PostsRepository };
