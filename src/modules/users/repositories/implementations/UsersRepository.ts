import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import User, { IUser } from "../../infra/mongoose/models/User";
import { IUsersRepository } from "../IUsersRepository";

export default class UsersRepository implements IUsersRepository {
    public async create({
        nickname,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        const newUser = new User({
            nickname,
            email,
            password,
        });

        const user = await newUser.save();

        return user.toObject();
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        const user = await User.findOne({ email });
        return user?.toObject() || undefined;
    }

    public async findByNickname(nickname: string): Promise<IUser | undefined> {
        const user = await User.findOne({ nickname });
        return user?.toObject() || undefined;
    }

    public async findById(id: string): Promise<IUser | undefined> {
        const user = await User.findById(id);
        return user?.toObject() || undefined;
    }

    public async update(
        user_id: string,
        newData: IUpdateUserDTO
    ): Promise<IUser | undefined> {
        await User.findByIdAndUpdate(user_id, newData);

        const updatedUser = await User.findById(user_id);

        return updatedUser?.toObject() || undefined;
    }

    public async delete(user_id: string): Promise<void> {
        await User.findByIdAndDelete(user_id);
    }
}
