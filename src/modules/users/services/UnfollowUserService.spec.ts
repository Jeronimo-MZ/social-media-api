import { AppError } from "@shared/errors/AppError";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import { FollowUserService } from "./FollowUserService";
import { UnfollowUserService } from "./UnfollowUserService";

describe("UnfollowUser", () => {
    it("should be able to unfollow a user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);
        const unfollowUser = new UnfollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const followedUser = await createUser.execute({
            email: "followed@mail.com",
            nickname: "followed",
            password: "12345678",
        });

        await FollowUser.execute({
            followed_user_id: followedUser._id,
            user_id: user._id,
        });

        await unfollowUser.execute({
            followed_user_id: followedUser._id,
            user_id: user._id,
        });

        const tempUser = await usersRepository.findById(user._id);

        const tempFollowedUser = await usersRepository.findById(
            followedUser._id,
        );

        expect(tempUser).not.toBeUndefined();
        expect(tempFollowedUser).not.toBeUndefined();

        expect(tempUser?.followings).not.toContain(tempFollowedUser?._id);
        expect(tempFollowedUser?.followers).not.toContain(tempUser?._id);
    });

    it("should not be able to unfollow himself", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const unfollowUser = new UnfollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        await expect(
            unfollowUser.execute({
                followed_user_id: user._id,
                user_id: user._id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to unfollow a user that he does not follow", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const unfollowUser = new UnfollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const followedUser = await createUser.execute({
            email: "followed@mail.com",
            nickname: "followed",
            password: "12345678",
        });

        await expect(
            unfollowUser.execute({
                followed_user_id: followedUser._id,
                user_id: user._id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to unfollow a non-existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const unfollowUser = new UnfollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        await expect(
            unfollowUser.execute({
                followed_user_id: "fakeId1234",
                user_id: user._id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to unfollow with an non-existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const unfollowUser = new UnfollowUserService(usersRepository);

        const followedUser = await createUser.execute({
            email: "followed@mail.com",
            nickname: "followed",
            password: "12345678",
        });

        await expect(
            unfollowUser.execute({
                followed_user_id: followedUser._id,
                user_id: "fakeId1234",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
