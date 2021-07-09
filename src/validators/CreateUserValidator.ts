import * as Yup from "yup";
import { AppError } from "../errors/AppError";

class CreateUserValidator {
    async validate(object: Object): Promise<void> {
        const schema = Yup.object({
            nickname: Yup.string().min(3).required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { CreateUserValidator };
