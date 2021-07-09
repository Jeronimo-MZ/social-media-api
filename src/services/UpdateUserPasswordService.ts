import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../container/providers/HashProvider/models/IHashProvider";
import { IUpdateUserPasswordDTO } from "../modules/users/dtos/IUpdateUserPasswordDTO";
import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class UpdateUserPasswordService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}
    async execute(
        user_id: string,
        { oldPassword, newPassword }: IUpdateUserPasswordDTO
    ) {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (
            !(await this.hashProvider.compareHash(oldPassword, user.password))
        ) {
            throw new AppError("Wrong Old Password!");
        }

        const hashedPassword = await this.hashProvider.generateHash(
            newPassword
        );

        return await this.usersRepository.update(user_id, {
            password: hashedPassword,
        });
    }
}

export { UpdateUserPasswordService };
