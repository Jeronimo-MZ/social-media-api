import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";

class UpdateUserPasswordValidator {
    async validate(object: unknown): Promise<void> {
        const schema = Yup.object({
            oldPassword: Yup.string().min(6).max(30).required(),
            newPassword: Yup.string().min(6).max(30).required(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { UpdateUserPasswordValidator };
