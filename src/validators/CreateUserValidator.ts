import * as Yup from "yup";
import { AppError } from "../errors/AppError";

class CreateUserValidator {
    async validate(object: Object): Promise<void> {
        const schema = Yup.object({
            nickname: Yup.string().min(3),
            email: Yup.string().email().required(),
            password: Yup.string().min(6),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { CreateUserValidator };
