import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { CreateSessionValidator } from "@modules/users/validators/CreateSessionalidator";

class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const validator = new CreateSessionValidator();

        await validator.validate(request.body);
        const { token, user } = await container
            .resolve(AuthenticateUserService)
            .execute(request.body);

        return response.json({ user: { ...user, password: undefined }, token });
    }
}

export { SessionsController };
