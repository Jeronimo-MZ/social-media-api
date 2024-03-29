import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUser } from "@modules/users/infra/mongoose/models/User";
import { IFollowUserDTO } from "../dtos/IFollowUserDTO";
import { IUnfollowUserDTO } from "../dtos/IUnfollowUserDTO";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findByNickname(nickname: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    update(
        user_id: string,
        newData: IUpdateUserDTO,
    ): Promise<IUser | undefined>;
    delete(user_id: string): Promise<void>;
    followUser(data: IFollowUserDTO): Promise<void>;
    unfollowUser(data: IUnfollowUserDTO): Promise<void>;
}
