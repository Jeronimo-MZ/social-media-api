import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IHashProvider } from "../validators/providers/HashProvider/IHashProvider";

export default class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider
    ) {}

    async execute({ email, nickname, password }: ICreateUserDTO) {
        const userWithEmail = await this.usersRepository.findByEmail(email);
        nickname = nickname.trim();

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
