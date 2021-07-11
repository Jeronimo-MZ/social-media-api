import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { AppError } from "@shared/errors/AppError";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";
import { ShowPostService } from "./ShowPostService";

describe("ShowPost", () => {
    it("should be able to show a post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const showPost = new ShowPostService(postsRepository);

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

        const post2 = await showPost.execute(post._id);

        expect(post2).toMatchObject(post);
    });

    it("should not be able to show a non-existent post", async () => {
        const postsRepository = new FakePostsRepository();
        const showPost = new ShowPostService(postsRepository);

        expect.assertions(1);
        await expect(showPost.execute("fake_id123")).rejects.toEqual(
            new AppError("Post not found!", 404),
        );
    });
});
