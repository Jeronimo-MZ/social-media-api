import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import { DeleteUserService } from "./DeleteUserService";

describe("DeleteUser", () => {
    it("should be able to delete a user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        const createdUser = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const deleteUser = new DeleteUserService(usersRepository, hashProvider);

        await deleteUser.execute(createdUser._id, createdUser.password);

        const user = await usersRepository.findByEmail("user@mail.com");

        expect(user).toBeUndefined();
    });

    it("should not be able to delete a user with wrong password", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        const createdUser = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const deleteUser = new DeleteUserService(usersRepository, hashProvider);

        expect.assertions(1);
        await expect(
            deleteUser.execute(createdUser._id, "wrongPassword"),
        ).rejects.toEqual(
            new AppError("Wrong Password!", HttpStatusCode.UNAUTHORIZED),
        );
    });

    it("should not be able to delete a non existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const deleteUser = new DeleteUserService(usersRepository, hashProvider);

        expect.assertions(1);
        await expect(
            deleteUser.execute("fakeId123", "wrong password"),
        ).rejects.toEqual(
            new AppError("User not found", HttpStatusCode.UNAUTHORIZED),
        );
    });
});
