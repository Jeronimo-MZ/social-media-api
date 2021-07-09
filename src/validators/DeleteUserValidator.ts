import * as Yup from "yup";
import { AppError } from "../errors/AppError";

class DeleteUserValidator {
    async validate(object: Object): Promise<void> {
        const schema = Yup.object({
            password: Yup.string().min(6).max(30).required(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { DeleteUserValidator };
