export interface ITokenProvider {
    generateToken(user_id: string): string;
    getDataOrFail(token: string): string;
}
