import { inject, injectable } from "tsyringe";
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";
import { IUpdateUserPasswordDTO } from "@modules/users/dtos/IUpdateUserPasswordDTO";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUser } from "../infra/mongoose/models/User";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

@injectable()
class UpdateUserPasswordService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}
    async execute(
        user_id: string,
        { oldPassword, newPassword }: IUpdateUserPasswordDTO,
    ): Promise<IUser | undefined> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.UNAUTHORIZED);
        }

        if (
            !(await this.hashProvider.compareHash(oldPassword, user.password))
        ) {
            throw new AppError(
                "Wrong Old Password!",
                HttpStatusCode.UNAUTHORIZED,
            );
        }

        const hashedPassword = await this.hashProvider.generateHash(
            newPassword,
        );

        return await this.usersRepository.update(user_id, {
            password: hashedPassword,
        });
    }
}

export { UpdateUserPasswordService };
