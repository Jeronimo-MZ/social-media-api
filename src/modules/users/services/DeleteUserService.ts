import { inject, injectable } from "tsyringe";
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

@injectable()
class DeleteUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}
    async execute(user_id: string, password: string): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.UNAUTHORIZED);
        }

        if (!(await this.hashProvider.compareHash(password, user.password))) {
            throw new AppError("Wrong Password!", HttpStatusCode.UNAUTHORIZED);
        }

        await this.usersRepository.delete(user_id);
    }
}

export { DeleteUserService };
