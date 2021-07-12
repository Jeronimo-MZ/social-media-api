import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";
import { UpdatePostService } from "./UpdatePostService";

describe("UpdatePost", () => {
    it("should be able to update a Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updatePost = new UpdatePostService(postsRepository);

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

        const updatedPost = await updatePost.execute({
            content: "new content",
            post_id: post._id,
            author_id: user._id,
        });

        if (!updatedPost) {
            expect(updatedPost).not.toBeUndefined();
            return;
        }

        expect(updatedPost?.content).toBe("new content");
        expect(await postsRepository.findById(post._id)).toMatchObject(
            updatedPost,
        );
    });

    it("should not be able to update a non-existent Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updatePost = new UpdatePostService(postsRepository);

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            updatePost.execute({
                author_id: user._id,
                post_id: "fakePostId124",
                content: "new content",
            }),
        ).rejects.toEqual(
            new AppError("Post not found!", HttpStatusCode.NOT_FOUND),
        );
    });

    it("should not be able to update another user's Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const updatePost = new UpdatePostService(postsRepository);

        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const otherUser = await createUser.execute({
            email: "another@mail.com",
            nickname: "otherUser",
            password: "12345678",
        });

        const post = await createPost.execute({
            content: "new Post content",
            user_id: user._id,
        });

        expect.assertions(1);
        await expect(
            updatePost.execute({
                author_id: otherUser._id,
                post_id: post._id,
                content: "new content",
            }),
        ).rejects.toEqual(
            new AppError(
                "You can update only your own posts",
                HttpStatusCode.FORBIDDEN,
            ),
        );
    });
});
