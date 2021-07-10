import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IUpdatePostDTO } from "@modules/posts/dtos/IUpdatePostDTO";
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

    async update({
        content,
        post_id,
    }: IUpdatePostDTO): Promise<IPost | undefined> {
        await Post.findByIdAndUpdate(post_id, { content });

        const updatedPost = await Post.findById(post_id, { content });
        return updatedPost?.toObject() || undefined;
    }

    async findById(id: string): Promise<IPost | undefined> {
        const post = await Post.findById(id);
        return post?.toObject() || undefined;
    }
}

export { PostsRepository };
