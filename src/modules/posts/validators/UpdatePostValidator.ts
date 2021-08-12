import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";

class UpdatePostValidator {
    async validate(object: unknown): Promise<void> {
        const schema = Yup.object({
            content: Yup.string().required(),
            user_id: Yup.string().required(),
            post_id: Yup.string().required(),
            image: Yup.string().notRequired(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { UpdatePostValidator };
