import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IToggleLikePostDTO } from "@modules/posts/dtos/IToggleLikePostDTO";
import { IUpdatePostDTO } from "@modules/posts/dtos/IUpdatePostDTO";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import Post, { IPost } from "../models/Post";

class PostsRepository implements IPostsRepository {
    async create({ user_id, content, image }: ICreatePostDTO): Promise<IPost> {
        const newPost = new Post({
            author_id: user_id,
            content,
            image,
        });

        const post = await newPost.save();
        return post.toObject();
    }

    async update({
        content,
        post_id,
        image,
    }: IUpdatePostDTO): Promise<IPost | undefined> {
        if (image) {
            await Post.findByIdAndUpdate(post_id, { content, image });
        } else {
            await Post.findByIdAndUpdate(post_id, { content });
        }

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

    async findAllByAuthorId(author_id: string): Promise<IPost[]> {
        const posts = await Post.find({ author_id });

        return posts.map(post => post.toObject()).reverse();
    }
}

export { PostsRepository };
