import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import { FollowUserService } from "./FollowUserService";

describe("FollowUser", () => {
    it("should be able to follow a user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);

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

        const tempUser = await usersRepository.findById(user._id);

        const tempFollowedUser = await usersRepository.findById(
            followedUser._id,
        );

        expect(tempUser).not.toBeUndefined();
        expect(tempFollowedUser).not.toBeUndefined();

        expect(tempUser?.followings).toContain(tempFollowedUser?._id);
        expect(tempFollowedUser?.followers).toContain(tempUser?._id);
    });

    it("should not be able to follow himself", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            FollowUser.execute({
                followed_user_id: user._id,
                user_id: user._id,
            }),
        ).rejects.toEqual(
            new AppError(
                "You cannot follow yourself",
                HttpStatusCode.FORBIDDEN,
            ),
        );
    });

    it("should not be able to follow a user that already he follows", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);

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

        expect.assertions(1);
        await expect(
            FollowUser.execute({
                followed_user_id: followedUser._id,
                user_id: user._id,
            }),
        ).rejects.toEqual(
            new AppError(
                "You already follow this user",
                HttpStatusCode.FORBIDDEN,
            ),
        );
    });

    it("should not be able to follow a non-existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            FollowUser.execute({
                followed_user_id: "fakeId1234",
                user_id: user._id,
            }),
        ).rejects.toEqual(
            new AppError("Followed user Not found", HttpStatusCode.NOT_FOUND),
        );
    });

    it("should not be able to follow with an non-existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const FollowUser = new FollowUserService(usersRepository);

        const followedUser = await createUser.execute({
            email: "followed@mail.com",
            nickname: "followed",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            FollowUser.execute({
                followed_user_id: followedUser._id,
                user_id: "fakeId1234",
            }),
        ).rejects.toEqual(
            new AppError("User Not found", HttpStatusCode.UNAUTHORIZED),
        );
    });
});
