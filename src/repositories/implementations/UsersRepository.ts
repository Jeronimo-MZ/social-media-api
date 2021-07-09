import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import User, { IUser } from "../../models/User";
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
        return user || undefined;
    }

    public async findByNickname(nickname: string): Promise<IUser | undefined> {
        const user = await User.findOne({ nickname });
        return user || undefined;
    }
}
