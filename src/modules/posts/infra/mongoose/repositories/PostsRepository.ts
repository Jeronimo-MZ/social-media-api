import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IToggleLikePostDTO } from "@modules/posts/dtos/IToggleLikePostDTO";
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

    async delete(post_id: string): Promise<void> {
        await Post.findByIdAndDelete(post_id);
    }

    async findById(id: string): Promise<IPost | undefined> {
        const post = await Post.findById(id);
        return post?.toObject() || undefined;
    }

    async addLike({ post_id, user_id }: IToggleLikePostDTO): Promise<void> {
        const post = await Post.findById(post_id);
        await post?.updateOne({ $push: { likes: user_id } });
    }

    async removeLike({ post_id, user_id }: IToggleLikePostDTO): Promise<void> {
        const post = await Post.findById(post_id);
        await post?.updateOne({ $pull: { likes: user_id } });
    }
}

export { PostsRepository };
