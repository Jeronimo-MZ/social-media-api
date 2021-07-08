import { Schema, model } from "mongoose";

export interface IUser {
    nickname: string;
    email: string;
    password: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: string[];
    followings?: string[];
    isAdmin?: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        nickname: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 30,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IUser>("User", UserSchema);
