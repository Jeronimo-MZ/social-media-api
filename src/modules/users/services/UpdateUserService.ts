import { inject, injectable } from "tsyringe";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUser } from "../infra/mongoose/models/User";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

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
            throw new AppError("User not found", HttpStatusCode.UNAUTHORIZED);
        }

        if (email) {
            email = email.trim().toLowerCase();
            const userWithEmail = await this.usersRepository.findByEmail(email);

            if (userWithEmail && user.email !== email) {
                throw new AppError(
                    "Email already used!",
                    HttpStatusCode.CONFLICT,
                );
            }
        }

        if (nickname) {
            nickname = nickname.trim().toLowerCase();
            const userWithNickname = await this.usersRepository.findByNickname(
                nickname,
            );

            if (nickname.includes(" ")) {
                throw new AppError("Nickname cannot contain spaces");
            }

            if (userWithNickname && user.nickname !== nickname) {
                throw new AppError(
                    "Nickname already used!",
                    HttpStatusCode.CONFLICT,
                );
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
