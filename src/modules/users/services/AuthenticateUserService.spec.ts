import { AppError } from "@shared/errors/AppError";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { JwtTokenProvider } from "../providers/TokenProvider/implementations/JwtTokenProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
    it("should be able to authenticate user", async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const TokenProvider = new JwtTokenProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            TokenProvider,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const response = await authenticateUser.execute({
            email: "user@mail.com",
            password: "12345678",
        });

        expect(response).toHaveProperty("token");
        expect(response.user).toMatchObject({
            nickname: user.nickname,
            email: user.email,
        });
    });

    it("should not be able authenticate with non-existent user", async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const TokenProvider = new JwtTokenProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            TokenProvider,
        );

        expect(
            authenticateUser.execute({
                email: "user@mail.com",
                password: "12345678",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able authenticate user with wrong password", async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const TokenProvider = new JwtTokenProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            TokenProvider,
        );

        await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect(
            authenticateUser.execute({
                email: "user@mail.com",
                password: "wrongPassword",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
