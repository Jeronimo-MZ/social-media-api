import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IToggleLikePostDTO } from "@modules/posts/dtos/IToggleLikePostDTO";
import { IUpdatePostDTO } from "@modules/posts/dtos/IUpdatePostDTO";
import { IPost } from "@modules/posts/infra/mongoose/models/Post";
import { IPostsRepository } from "../IPostsRepository";

class FakePostsRepository implements IPostsRepository {
    private posts: IPost[];

    constructor() {
        this.posts = [];
    }

    async create({ content, user_id }: ICreatePostDTO): Promise<IPost> {
        const newPost: IPost = {
            _id: user_id + Math.floor(Math.random() * 10000).toString(),
            author_id: user_id,
            content,
            likes: [],
        };

        this.posts.push(newPost);

        return newPost;
    }

    async update({
        content,
        post_id,
    }: IUpdatePostDTO): Promise<IPost | undefined> {
        const post = await this.findById(post_id);

        if (!post) {
            return undefined;
        }
        post.content = content;
        return post;
    }

    async delete(post_id: string): Promise<void> {
        this.posts = this.posts.filter(post => post._id != post_id);
    }

    async findById(id: string): Promise<IPost | undefined> {
        return this.posts.find(post => post._id === id);
    }

    async findAllByAuthorId(author_id: string): Promise<IPost[]> {
        return this.posts.filter(post => post.author_id === author_id);
    }

    async addLike({ post_id, user_id }: IToggleLikePostDTO): Promise<void> {
        this.posts.find(post => post._id === post_id)?.likes.push(user_id);
    }

    async removeLike({ post_id, user_id }: IToggleLikePostDTO): Promise<void> {
        const post = this.posts.find(post => post._id === post_id);

        if (!post) return;

        post.likes = post.likes.filter(likerId => likerId !== user_id);
    }
}

export { FakePostsRepository };
