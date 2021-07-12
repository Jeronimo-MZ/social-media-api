import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { AppError } from "@shared/errors/AppError";
import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";
import { ToggleLikePostService } from "./ToggleLikePostService";

describe("ToggleLikePost", () => {
    it("should be able to like a  Post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const toggleLikePost = new ToggleLikePostService(
            postsRepository,
            usersRepository,
        );

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

        expect(
            await toggleLikePost.execute({
                post_id: post._id,
                user_id: user._id,
            }),
        ).toBe("The post has been liked");

        const post2 = await postsRepository.findById(post._id);
        expect(post2).not.toBeUndefined();
        expect(post2?.likes).toContain(user._id);
    });

    it("should be able to dislike a post (remove the like)", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const toggleLikePost = new ToggleLikePostService(
            postsRepository,
            usersRepository,
        );

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

        expect(
            await toggleLikePost.execute({
                post_id: post._id,
                user_id: user._id,
            }),
        ).toBe("The post has been liked");

        expect(
            await toggleLikePost.execute({
                post_id: post._id,
                user_id: user._id,
            }),
        ).toBe("The post has been disliked");

        const post2 = await postsRepository.findById(post._id);
        expect(post2).not.toBeUndefined();
        expect(post2?.likes).not.toContain(user._id);
    });

    it("should not be able to like a non-existent post", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const toggleLikePost = new ToggleLikePostService(
            postsRepository,
            usersRepository,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        expect.assertions(1);
        await expect(
            toggleLikePost.execute({
                post_id: "fakePostID",
                user_id: user._id,
            }),
        ).rejects.toEqual(
            new AppError("Post not found", HttpStatusCode.NOT_FOUND),
        );
    });

    it("should not be able to like a post with non-existent user", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(usersRepository, hashProvider);
        const toggleLikePost = new ToggleLikePostService(
            postsRepository,
            usersRepository,
        );

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

        expect.assertions(1);
        await expect(
            toggleLikePost.execute({
                post_id: post._id,
                user_id: "fakeUserId123",
            }),
        ).rejects.toEqual(
            new AppError("User not found", HttpStatusCode.UNAUTHORIZED),
        );
    });
});
