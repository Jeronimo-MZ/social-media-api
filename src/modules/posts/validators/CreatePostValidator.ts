import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";

class CreatePostValidator {
    async validate(object: Object): Promise<void> {
        const schema = Yup.object({
            content: Yup.string().required(),
            user_id: Yup.string().required(),
        });

        try {
            await schema.validate(object, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { CreatePostValidator };
