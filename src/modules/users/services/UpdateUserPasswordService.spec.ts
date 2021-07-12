import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import { UpdateUserPasswordService } from "./UpdateUserPasswordService";

describe("UpdateUserPassword", () => {
    it("should be able to update a user's password", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updatePassword = new UpdateUserPasswordService(
            usersRepository,
            hashProvider,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        await updatePassword.execute(user._id, {
            oldPassword: user.password,
            newPassword: "updatedPassword",
        });

        const updatedUser = await usersRepository.findById(user._id);

        expect(updatedUser).not.toBeUndefined();
        expect(updatedUser?.password).toBe("updatedPassword");
    });

    it("should not be able to update the password of a non-existent user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const updatePassword = new UpdateUserPasswordService(
            usersRepository,
            hashProvider,
        );

        expect.assertions(1);
        await expect(
            updatePassword.execute("fakeId1234", {
                oldPassword: "oldPassword",
                newPassword: "updatedPassword",
            }),
        ).rejects.toEqual(
            new AppError("User not found", HttpStatusCode.UNAUTHORIZED),
        );
    });

    it("should be able to update the password if an wrong old password is provided", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(usersRepository, hashProvider);

        const updatePassword = new UpdateUserPasswordService(
            usersRepository,
            hashProvider,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            updatePassword.execute(user._id, {
                oldPassword: "wrongPassword",
                newPassword: "updatedPassword",
            }),
        ).rejects.toEqual(
            new AppError("Wrong Old Password!", HttpStatusCode.UNAUTHORIZED),
        );
    });
});
