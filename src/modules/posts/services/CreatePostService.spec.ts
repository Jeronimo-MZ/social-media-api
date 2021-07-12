import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";

describe("CreatePost", () => {
    it("should be able to create a new Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });
        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        const post = await createPost.execute({
            content: "new Post content",
            user_id: user._id,
        });

        expect(post).toHaveProperty("_id");
        expect(post.author_id).toBe(user._id);
        expect(post.content).toBe("new Post content");
        expect(post.likes.length).toBe(0);
    });

    it("should not be able to create a new  post with non-existent user", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();

        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        expect.assertions(1);
        await expect(
            createPost.execute({
                content: "new Post content",
                user_id: "fakeId123456",
            }),
        ).rejects.toEqual(
            new AppError("User not found!", HttpStatusCode.UNAUTHORIZED),
        );
    });
});
