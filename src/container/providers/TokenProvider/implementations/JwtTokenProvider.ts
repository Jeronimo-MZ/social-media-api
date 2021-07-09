import { ITokenProvider } from "../models/ITokenProvider";
import { sign, verify } from "jsonwebtoken";
import authConfig from "../../../../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    user_id: string;
}

class JwtTokenProvider implements ITokenProvider {
    /**
     * will fail if invalid jwt token is provided
     * @param token
     * @returns user_id
     */
    getDataOrFail(token: string): string {
        const decoded = verify(token, authConfig.secret);
        const { user_id } = decoded as TokenPayload;
        return user_id;
    }
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
