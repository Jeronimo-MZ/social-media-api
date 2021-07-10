import { Request, Response } from "express";
import { container } from "tsyringe";
import UsersRepository from "@modules/users/infra/mongoose/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { DeleteUserService } from "@modules/users/services/DeleteUserService";
import { UpdateUserService } from "@modules/users/services/UpdateUserService";
import { CreateUserValidator } from "@modules/users/validators/CreateUserValidator";
import { DeleteUserValidator } from "@modules/users/validators/DeleteUserValidator";
import { UpdateUserValidator } from "@modules/users/validators/UpdateUserValidator";

class UsersController {
    async show(request: Request, response: Response): Promise<Response> {
        const usersRepository: IUsersRepository = new UsersRepository();
        return response.json({
            user: {
                ...(await usersRepository.findById(request.body.user_id)),
                password: undefined,
            },
        });
    }

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
        const validator = new DeleteUserValidator();
        await validator.validate(request.body);

        const deleteUser = container.resolve(DeleteUserService);
        await deleteUser.execute(request.body.user_id, request.body.password);

        return response.status(203).send();
    }
}

export { UsersController };
