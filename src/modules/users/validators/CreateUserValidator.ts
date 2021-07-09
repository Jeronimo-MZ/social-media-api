import * as Yup from "yup";
import { AppError } from "../../../errors/AppError";

class CreateUserValidator {
    async validate(object: Object): Promise<void> {
        const schema = Yup.object({
            nickname: Yup.string().min(3).max(20).required(),
            email: Yup.string().email().max(50).required(),
            password: Yup.string().min(6).max(30).required(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { CreateUserValidator };
