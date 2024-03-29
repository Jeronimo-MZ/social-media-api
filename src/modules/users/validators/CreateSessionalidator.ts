import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";

class CreateSessionValidator {
    async validate(object: unknown): Promise<void> {
        const schema = Yup.object({
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

export { CreateSessionValidator };
