import { FakeHashProvider } from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import { FollowUserService } from "@modules/users/services/FollowUserService";
import { AppError } from "@shared/errors/AppError";
import { FakePostsRepository } from "../repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";
import { ShowUserTimelineService } from "./ShowUserTimelineService";

describe("UpdatePost", () => {
    it("should be able to show a user's timeline", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(usersRepository, hashProvider);
        const followUser = new FollowUserService(usersRepository);
        const showTimeline = new ShowUserTimelineService(
            postsRepository,
            usersRepository,
        );

        const user = await createUser.execute({
            email: "user@mail.com",
            nickname: "username",
            password: "12345678",
        });

        const followedUser = await createUser.execute({
            email: "user2@mail.com",
            nickname: "username2",
            password: "12345678",
        });

        await followUser.execute({
            user_id: user._id,
            followed_user_id: followedUser._id,
        });

        const createPost = new CreatePostService(
            postsRepository,
            usersRepository,
        );

        const post = await createPost.execute({
            content: "new Post content",
            user_id: user._id,
        });

        const followedUserPost = await createPost.execute({
            content: "Post content",
            user_id: followedUser._id,
        });

        const timeline = await showTimeline.execute(user._id);

        expect(timeline).toContain(post);
        expect(timeline).toContain(followedUserPost);
    });

    it("should not be able to show a non-existent user's timeline", async () => {
        const postsRepository = new FakePostsRepository();
        const usersRepository = new FakeUsersRepository();

        const showTimeline = new ShowUserTimelineService(
            postsRepository,
            usersRepository,
        );

        expect.assertions(1);
        await expect(showTimeline.execute("FakeUserId123")).rejects.toEqual(
            new AppError("User not found!", 404),
        );
    });
});
