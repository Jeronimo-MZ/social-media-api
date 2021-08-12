import { Schema, model } from "mongoose";

export interface IPost {
    _id: string;
    author_id: string;
    image?: string;
    content: string;
    likes: string[];
}

const PostSchema = new Schema<IPost>(
    {
        author_id: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            max: 500,
        },
        image: {
            type: String,
            required: false,
            max: 500,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export default model<IPost>("Post", PostSchema);
