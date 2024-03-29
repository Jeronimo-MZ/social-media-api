import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IHashProvider } from "@modules/users/providers/HashProvider/models/IHashProvider";
import { inject, injectable } from "tsyringe";
import { IUser } from "../infra/mongoose/models/User";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    async execute({
        email,
        nickname,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        const userWithEmail = await this.usersRepository.findByEmail(email);
        nickname = nickname.trim().toLowerCase();
        email = email.trim().toLowerCase();

        if (nickname.includes(" ")) {
            throw new AppError("Nickname cannot contain spaces");
        }

        if (userWithEmail) {
            throw new AppError("Email already used!", HttpStatusCode.CONFLICT);
        }

        const userWithNickname = await this.usersRepository.findByNickname(
            nickname,
        );

        if (userWithNickname) {
            throw new AppError(
                "Nickname already used!",
                HttpStatusCode.CONFLICT,
            );
        }
        const user = await this.usersRepository.create({
            email,
            nickname,
            password: await this.hashProvider.generateHash(password),
        });

        return user;
    }
}
