import { inject, injectable } from "tsyringe";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUser } from "../infra/mongoose/models/User";

@injectable()
class UpdateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}
    async execute(
        user_id: string,
        {
            email,
            nickname,
            city,
            coverPicture,
            description,
            hometown,
            profilePicture,
            relationship,
        }: IUpdateUserDTO,
    ): Promise<IUser | undefined> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (email) {
            email = email.trim().toLowerCase();
            const userWithEmail = await this.usersRepository.findByEmail(email);

            if (userWithEmail && user.email !== email) {
                throw new AppError("Email already used!");
            }
        }

        if (nickname) {
            nickname = nickname.trim().toLowerCase();
            const userWithNickname = await this.usersRepository.findByNickname(
                nickname,
            );

            if (userWithNickname && user.nickname !== nickname) {
                throw new AppError("Nickname already used!");
            }
        }

        if (relationship) {
            if (relationship <= 0 || relationship > 3) {
                throw new AppError("relashionship must be 1, 2 or 3");
            }
        }

        return await this.usersRepository.update(user_id, {
            email: email || user.email,
            nickname: nickname || user.nickname,
            city: city || user.city,
            coverPicture: coverPicture || user.coverPicture,
            description: description || user.description,
            hometown: hometown || user.hometown,
            profilePicture: profilePicture || user.profilePicture,
            relationship: relationship || user.relationship,
        });
    }
}

export { UpdateUserService };
