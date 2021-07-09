import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUser } from "../models/User";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findByNickname(nickname: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    update(
        user_id: string,
        newData: IUpdateUserDTO
    ): Promise<IUser | undefined>;
    delete(user_id: string): Promise<void>;
}
