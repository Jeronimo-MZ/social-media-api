import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../../dtos/IUpdateUserDTO";
import User, { IUser } from "../../models/User";
import { IUsersRepository } from "../../../../repositories/IUsersRepository";
import { IFollowUserDTO } from "@modules/users/dtos/IFollowUserDTO";
import { IUnfollowUserDTO } from "@modules/users/dtos/IUnfollowUserDTO";

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
        newData: IUpdateUserDTO,
    ): Promise<IUser | undefined> {
        await User.findByIdAndUpdate(user_id, newData);

        const updatedUser = await User.findById(user_id);

        return updatedUser?.toObject() || undefined;
    }

    public async delete(user_id: string): Promise<void> {
        await User.findByIdAndDelete(user_id);
    }

    async followUser({
        followed_user_id,
        user_id,
    }: IFollowUserDTO): Promise<void> {
        const currentUser = await User.findById(user_id);
        const followedUser = await User.findById(followed_user_id);

        if (!currentUser) return;
        if (!followedUser) return;

        if (currentUser.followings?.includes(followed_user_id)) {
            return;
        }
        await currentUser.updateOne({
            $push: { followings: followed_user_id },
        });

        if (followedUser.followers?.includes(user_id)) {
            return;
        }

        await followedUser.updateOne({ $push: { followers: user_id } });
    }

    async unfollowUser({
        followed_user_id,
        user_id,
    }: IUnfollowUserDTO): Promise<void> {
        const currentUser = await User.findById(user_id);
        const followedUser = await User.findById(followed_user_id);

        if (!currentUser) return;
        if (!followedUser) return;

        if (!currentUser.followings?.includes(followed_user_id)) {
            return;
        }

        await currentUser.updateOne({
            $pull: { followings: followed_user_id },
        });

        if (!followedUser.followers?.includes(user_id)) {
            return;
        }

        await followedUser.updateOne({ $pull: { followers: user_id } });
    }
}
