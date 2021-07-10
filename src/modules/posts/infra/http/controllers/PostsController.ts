import { CreatePostService } from "@modules/posts/services/CreatePostService";
import { CreatePostValidator } from "@modules/posts/validators/CreatePostValidator";
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
}

export { PostsController };
