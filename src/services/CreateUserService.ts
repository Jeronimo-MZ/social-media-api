import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";

export default class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

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
            password,
        });

        return user;
    }
}
