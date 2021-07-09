import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import { CreateUserValidator } from "../validators/CreateUserValidator";

class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const createUser = container.resolve(CreateUserService);
        const validator = new CreateUserValidator();

        await validator.validate(request.body);

        const user = await createUser.execute(request.body);

        return response.json(user);
    }
}

export { UsersController };
