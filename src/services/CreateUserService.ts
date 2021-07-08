import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

export default class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ email, nickname, password }: ICreateUserDTO) {
        const userWithEmail = await this.usersRepository.findByEmail(email);

        if (userWithEmail) {
            throw new Error("Email already used!");
        }

        const userWithNickname = await this.usersRepository.findByNickname(
            nickname
        );

        if (userWithNickname) {
            throw new Error("Nickname already used!");
        }

        const user = await this.usersRepository.create({
            email,
            nickname,
            password,
        });

        return user;
    }
}
