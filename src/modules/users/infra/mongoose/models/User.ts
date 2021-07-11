import { Schema, model } from "mongoose";

export interface IUser {
    _id: string;
    nickname: string;
    email: string;
    password: string;
    profilePicture?: string;
    coverPicture?: string;
    followers: string[];
    followings: string[];
    isAdmin?: boolean;
    description?: string;
    city?: string;
    hometown?: string;
    relationship: 1 | 2 | 3;
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
        description: {
            type: String,
            max: 100,
        },
        city: {
            type: String,
            max: 50,
        },
        hometown: {
            type: String,
            max: 50,
        },
        relationship: { type: Number, enum: [1, 2, 3], default: 1 },
    },
    {
        timestamps: true,
    },
);

export default model<IUser>("User", UserSchema);
