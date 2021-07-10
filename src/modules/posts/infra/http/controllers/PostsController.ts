import { CreatePostService } from "@modules/posts/services/CreatePostService";
import { UpdatePostService } from "@modules/posts/services/UpdatePostService";
import { CreatePostValidator } from "@modules/posts/validators/CreatePostValidator";
import { UpdatePostValidator } from "@modules/posts/validators/UpdatePostValidator";
import { Request, Response } from "express";
import { container } from "tsyringe";

class PostsController {
    async create(request: Request, response: Response): Promise<Response> {
        const validator = new CreatePostValidator();

        await validator.validate(request.body);

        const createPost = container.resolve(CreatePostService);
        const post = await createPost.execute(request.body);

        return response.json(post);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const validator = new UpdatePostValidator();

        await validator.validate({ ...request.body, ...request.params });

        const updatePost = container.resolve(UpdatePostService);
        const updatedPost = await updatePost.execute({
            author_id: request.body.user_id,
            post_id: request.params.post_id,
            content: request.body.content,
        });

        return response.json({ post: { ...updatedPost } });
    }
}

export { PostsController };
