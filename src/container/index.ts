import { container } from "tsyringe";
import UsersRepository from "../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";

import "./providers";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
