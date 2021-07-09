export interface ITokenProvider {
    generateToken(user_id: string): string;
}
