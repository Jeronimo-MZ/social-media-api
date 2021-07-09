import { ITokenProvider } from "../models/ITokenProvider";
import { sign } from "jsonwebtoken";
import authConfig from "../../../../config/auth";

class JwtTokenProvider implements ITokenProvider {
    generateToken(user_id: string): string {
        const { secret, expiresIn } = authConfig;
        const token = sign({}, secret, {
            subject: user_id,
            expiresIn,
        });

        return token;
    }
}

export { JwtTokenProvider };
