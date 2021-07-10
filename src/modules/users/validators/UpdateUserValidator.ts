import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";

class UpdateUserValidator {
    async validate(object: unknown): Promise<void> {
        const schema = Yup.object({
            nickname: Yup.string().min(3).max(20).notRequired(),
            email: Yup.string().email().max(50).notRequired(),
            profilePicture: Yup.string().url().notRequired(),
            coverPicture: Yup.string().url().notRequired(),
            description: Yup.string().min(10).max(100).notRequired(),
            city: Yup.string().min(3).max(50).notRequired(),
            hometown: Yup.string().min(3).max(50).notRequired(),
            relationship: Yup.number().oneOf([1, 2, 3]).notRequired(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { UpdateUserValidator };
