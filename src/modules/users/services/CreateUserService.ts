import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IHashProvider } from "../../../container/providers/HashProvider/models/IHashProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}

    async execute({ email, nickname, password }: ICreateUserDTO) {
        const userWithEmail = await this.usersRepository.findByEmail(email);
        nickname = nickname.trim().toLowerCase();
        email = email.trim().toLowerCase();

        if (nickname.includes(" ")) {
            throw new AppError("Nickname cannot contain spaces");
        }

        if (userWithEmail) {
            throw new AppError("Email already used!");
        }

        const userWithNickname = await this.usersRepository.findByNickname(
            nickname
        );

        if (userWithNickname) {
            throw new AppError("Nickname already used!");
        }
        const user = await this.usersRepository.create({
            email,
            nickname,
            password: await this.hashProvider.generateHash(password),
        });

        return user;
    }
}
