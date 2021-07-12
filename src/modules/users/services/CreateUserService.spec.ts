import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
    it("should be able to create a new user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect(user).toHaveProperty("_id");
    });

    it("should not be able to create user with spaces in the nickname", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        expect.assertions(1);
        await expect(
            createUser.execute({
                email: "user@mail.com",
                nickname: "user name",
                password: "12345678",
            }),
        ).rejects.toEqual(new AppError("Nickname cannot contain spaces"));
    });

    it("should not be able to create user with same email from another", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            createUser.execute({
                email: "user@mail.com",
                nickname: "username2",
                password: "12345678",
            }),
        ).rejects.toEqual(
            new AppError("Email already used!", HttpStatusCode.CONFLICT),
        );
    });

    it("should not be able to create user with same nickname from another", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            createUser.execute({
                email: "user2@mail.com",
                nickname: "username",
                password: "12345678",
            }),
        ).rejects.toEqual(
            new AppError("Nickname already used!", HttpStatusCode.CONFLICT),
        );
    });
});
