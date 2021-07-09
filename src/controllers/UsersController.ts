import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { CreateUserValidator } from "../validators/CreateUserValidator";
import { UpdateUserValidator } from "../validators/UpdateUserValidator";

class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const createUser = container.resolve(CreateUserService);
        const validator = new CreateUserValidator();

        await validator.validate(request.body);

        const user = await createUser.execute(request.body);

        return response.json({ ...user, password: undefined });
    }

    async update(request: Request, response: Response): Promise<Response> {
        const validator = new UpdateUserValidator();
        await validator.validate(request.body);

        const updateUser = container.resolve(UpdateUserService);
        const updatedUser = await updateUser.execute(
            request.body.user_id,
            request.body
        );

        return response.json({ user: { ...updatedUser, password: undefined } });
    }

    async delete(request: Request, response: Response): Promise<Response> {
        // const validator = new UpdateUserValidator();
        // await validator.validate(request.body);

        const deleteUser = container.resolve(DeleteUserService);
        await deleteUser.execute(request.body.user_id, request.body.password);

        return response.status(203).send();
    }
}

export { UsersController };
