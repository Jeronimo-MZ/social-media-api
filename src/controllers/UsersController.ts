import { Request, Response } from "express";
import UsersRepository from "../repositories/implementations/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import { CreateUserValidator } from "../validators/CreateUserValidator";
import { BCryptHashProvider } from "../validators/providers/HashProvider/implementations/BCryptHashProvider";

class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const createUser = new CreateUserService(
            new UsersRepository(),
            new BCryptHashProvider()
        );
        const validator = new CreateUserValidator();

        await validator.validate(request.body);

        const user = await createUser.execute(request.body);

        return response.json(user);
    }
}

export { UsersController };
