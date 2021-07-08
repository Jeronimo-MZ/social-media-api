import { Request, Response } from "express";
import UsersRepository from "../repositories/implementations/UsersRepository";
import CreateUserService from "../services/CreateUserService";

class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const createUser = new CreateUserService(new UsersRepository());
        const user = await createUser.execute(request.body);
        return response.json(user);
    }
}

export { UsersController };
