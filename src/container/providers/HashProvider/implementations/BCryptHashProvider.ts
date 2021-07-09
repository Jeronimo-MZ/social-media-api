import { IHashProvider } from "../models/IHashProvider";
import bcrypt from "bcryptjs";

class BCryptHashProvider implements IHashProvider {
    async generateHash(payload: string): Promise<string> {
        return bcrypt.hash(payload, 10);
    }
    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);
    }
}

export { BCryptHashProvider };
