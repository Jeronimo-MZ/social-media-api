import { AppError } from "@shared/errors/AppError";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { FakeHashProvider } from "../providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import { UpdateUserService } from "./UpdateUserService";

describe("UpdateUser", () => {
    it("should be able to update a user", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updateUser = new UpdateUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const newUserData: IUpdateUserDTO = {
            email: "new@mail.com",
            nickname: "newnickname",
            city: "Maputo",
            coverPicture: "https://github.com/jeronimo-mz.png",
            profilePicture: "https://github.com/jeronimo-mz.png",
            description: "updated description",
            relationship: 2,
            hometown: "Maputo",
        };

        await updateUser.execute(user._id, newUserData);

        const updatedUser = await usersRepository.findById(user._id);

        expect(updatedUser).not.toBeUndefined();
        expect(updatedUser).toMatchObject(newUserData);
    });

    it("should not be able to update a non-existent user", async () => {
        const usersRepository = new FakeUsersRepository();
        const updateUser = new UpdateUserService(usersRepository);
        const newUserData: IUpdateUserDTO = {
            email: "new@mail.com",
            nickname: "newnickname",
            city: "Maputo",
            coverPicture: "https://github.com/jeronimo-mz.png",
            profilePicture: "https://github.com/jeronimo-mz.png",
            description: "updated description",
            relationship: 2,
            hometown: "Maputo",
        };

        await expect(
            updateUser.execute("fakeId1234", newUserData),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update the email to an already used email", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updateUser = new UpdateUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const user2 = await createUser.execute({
            email: "user2@mail.com",
            nickname: "username2",
            password: "12345678",
        });

        await expect(
            updateUser.execute(user._id, { email: user2.email }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update the nickname to an already used nickname", async () => {
        const hashProvider = new FakeHashProvider();
        const usersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updateUser = new UpdateUserService(usersRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const user2 = await createUser.execute({
            email: "user2@mail.com",
            nickname: "username2",
            password: "12345678",
        });

        await expect(
            updateUser.execute(user._id, { nickname: user2.nickname }),
        ).rejects.toBeInstanceOf(AppError);
    });
});