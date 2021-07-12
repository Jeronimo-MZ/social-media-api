import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";
import { DeletePostService } from "./DeletePostService";

describe("DeletePost", () => {
    it("should be able to delete a Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const deletePost = new DeletePostService(postsRepository);
        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const post = await createPost.execute({
            content: "new Post content",
            user_id: user._id,
        });

        await deletePost.execute({ author_id: user._id, post_id: post._id });

        expect(await postsRepository.findById(post._id)).toBeUndefined();
    });

    it("should not be able to delete a non existent post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const deletePost = new DeletePostService(postsRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            deletePost.execute({
                author_id: user._id,
                post_id: "fakePostId123",
            }),
        ).rejects.toEqual(
            new AppError("Post not found!", HttpStatusCode.NOT_FOUND),
        );
    });

    it("should not be able to delete another user's post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const deletePost = new DeletePostService(postsRepository);
        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const user2 = await createUser.execute({
            email: "another@mail.com",
            nickname: "anotheruser",
            password: "12345678",
        });

        const post = await createPost.execute({
            content: "new Post content",
            user_id: user._id,
        });

        expect.assertions(2);
        await expect(
            deletePost.execute({
                author_id: user2._id,
                post_id: post._id,
            }),
        ).rejects.toEqual(
            new AppError(
                "You can delete only your own posts",
                HttpStatusCode.FORBIDDEN,
            ),
        );

        expect(await postsRepository.findById(post._id)).not.toBeUndefined();
    });
});
