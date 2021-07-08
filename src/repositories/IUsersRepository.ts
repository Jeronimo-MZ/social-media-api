import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../models/User";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findByNickname(nickname: string): Promise<IUser | undefined>;
}
