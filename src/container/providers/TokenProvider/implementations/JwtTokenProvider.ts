import { ITokenProvider } from "../models/ITokenProvider";
import { sign } from "jsonwebtoken";
import authConfig from "../../../../config/auth";

class JwtTokenProvider implements ITokenProvider {
    generateToken(user_email: string): string {
        const { secret, expiresIn } = authConfig;
        const token = sign({}, secret, {
            subject: user_email,
            expiresIn,
        });

        return token;
    }
}

export { JwtTokenProvider };
