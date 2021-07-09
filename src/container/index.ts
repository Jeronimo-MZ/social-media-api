import { container } from "tsyringe";
import UsersRepository from "../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

import "./providers";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
