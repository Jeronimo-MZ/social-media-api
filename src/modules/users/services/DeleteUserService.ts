import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../../../container/providers/HashProvider/models/IHashProvider";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
class DeleteUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    async execute(user_id: string, password: string) {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (!(await this.hashProvider.compareHash(password, user.password))) {
            throw new AppError("Wrong Password!");
        }

        await this.usersRepository.delete(user_id);
    }
}

export { DeleteUserService };
