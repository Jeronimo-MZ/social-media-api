import { container } from "tsyringe";
import UsersRepository from "../../modules/users/infra/mongoose/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

import "../../modules/users/providers";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
