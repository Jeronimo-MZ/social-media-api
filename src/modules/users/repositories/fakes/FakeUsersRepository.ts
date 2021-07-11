import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IFollowUserDTO } from "@modules/users/dtos/IFollowUserDTO";
import { IUnfollowUserDTO } from "@modules/users/dtos/IUnfollowUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUser } from "@modules/users/infra/mongoose/models/User";
import { IUsersRepository } from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
    users: IUser[];
    constructor() {
        this.users = [];
    }
    async create({
        email,
        nickname,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        const user: IUser = {
            _id: nickname + Math.floor(Math.random() * 1000000).toString(),
            email,
            nickname,
            password,
            profilePicture: undefined,
            relationship: 1,
            city: undefined,
            coverPicture: undefined,
            description: undefined,
            followers: [],
            followings: [],
            hometown: undefined,
            isAdmin: false,
        };
        this.users.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<IUser | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    async findByNickname(nickname: string): Promise<IUser | undefined> {
        const user = this.users.find(user => user.nickname === nickname);

        return user;
    }

    async findById(id: string): Promise<IUser | undefined> {
        const user = this.users.find(user => user._id === id);

        return user;
    }

    async update(
        user_id: string,
        {
            city,
            coverPicture,
            description,
            email,
            hometown,
            nickname,
            password,
            profilePicture,
            relationship,
        }: IUpdateUserDTO,
    ): Promise<IUser | undefined> {
        const user = this.users.find(user => user._id === user_id);

        if (!user) return undefined;

        const updatedUser = {
            ...user,
            city: city || user.city,
            coverPicture: coverPicture || user.coverPicture,
            description: description || user.description,
            email: email || user.email,
            hometown: hometown || user.hometown,
            nickname: nickname || user.nickname,
            password: password || user.password,
            profilePicture: profilePicture || user.profilePicture,
            relationship: relationship || user.relationship,
        };
        const index = this.users.findIndex(
            findUser => findUser._id == user?._id,
        );

        this.users[index] = updatedUser;

        return updatedUser;
    }

    async delete(user_id: string): Promise<void> {
        this.users = this.users.filter(user => user._id !== user_id);
    }

    async followUser({
        followed_user_id,
        user_id,
    }: IFollowUserDTO): Promise<void> {
        const currentUser = await this.findById(user_id);
        const followedUser = await this.findById(followed_user_id);

        if (!currentUser) return;
        if (!followedUser) return;

        if (currentUser.followings.includes(followed_user_id)) {
            return;
        }
        currentUser.followings.push(followed_user_id);

        if (followedUser.followers.includes(user_id)) {
            return;
        }

        followedUser.followers.push(user_id);
    }

    async unfollowUser({
        followed_user_id,
        user_id,
    }: IUnfollowUserDTO): Promise<void> {
        const currentUser = await this.findById(user_id);
        const followedUser = await this.findById(followed_user_id);

        if (!currentUser) return;
        if (!followedUser) return;

        if (!currentUser.followings.includes(followed_user_id)) {
            return;
        }

        currentUser.followings = currentUser.followings.filter(
            following_id => following_id != followed_user_id,
        );

        if (!followedUser.followers.includes(user_id)) {
            return;
        }

        followedUser.followers = followedUser.followers.filter(
            follower_id => follower_id != user_id,
        );
    }
}

export { FakeUsersRepository };
