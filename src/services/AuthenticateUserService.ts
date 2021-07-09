import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUser } from "../models/User";
import { AppError } from "../errors/AppError";
import { IHashProvider } from "../container/providers/HashProvider/models/IHashProvider";
import { ITokenProvider } from "../container/providers/TokenProvider/models/ITokenProvider";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        nickname: string;
        email: string;
        profilePicture?: string;
        coverPicture?: string;
        followers?: string[];
        followings?: string[];
        isAdmin?: boolean;
    };
    token: string;
}
@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,

        @inject("TokenProvider")
        private tokenProvider: ITokenProvider
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination!", 401);
        }
        const hasPasswordMatched = await this.hashProvider.compareHash(
            password,
            user.password
        );

        if (!hasPasswordMatched) {
            throw new AppError("Incorrect email/password combination!", 401);
        }

        const token = this.tokenProvider.generateToken(user.email);

        return {
            user: {
                nickname: user.nickname,
                email: user.email,
                profilePicture: user.profilePicture,
                coverPicture: user.coverPicture,
                followers: user.followers,
                followings: user.followings,
                isAdmin: user.isAdmin,
            },
            token,
        };
    }
}
