import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserPasswordService } from "@modules/users/services/UpdateUserPasswordService";
import { UpdateUserPasswordValidator } from "@modules/users/validators/UpdateUserPasswordValidator";

class UserPasswordController {
    async update(request: Request, response: Response): Promise<Response> {
        const validator = new UpdateUserPasswordValidator();
        await validator.validate(request.body);

        const updateUserPassword = container.resolve(UpdateUserPasswordService);
        const updatedUser = await updateUserPassword.execute(
            request.body.user_id,
            request.body,
        );

        return response.json({ user: { ...updatedUser, password: undefined } });
    }
}

export { UserPasswordController };
