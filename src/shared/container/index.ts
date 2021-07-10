import { container } from "tsyringe";
import UsersRepository from "@modules/users/infra/mongoose/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import "@modules/users/providers";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { PostsRepository } from "@modules/posts/infra/mongoose/repositories/PostsRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IPostsRepository>(
    "PostsRepository",
    PostsRepository
);
