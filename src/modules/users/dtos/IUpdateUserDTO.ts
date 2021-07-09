export interface IUpdateUserDTO {
    nickname?: string;
    email?: string;
    password?: string;
    profilePicture?: string;
    coverPicture?: string;
    description?: string;
    city?: string;
    hometown?: string;
    relationship?: 1 | 2 | 3;
}
