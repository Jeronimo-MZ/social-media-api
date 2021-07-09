import { Schema, model } from "mongoose";

export interface IPost {
    _id: string;
    author_id: string;
    content: string;
    image: string;
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
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default model<IPost>("Post", PostSchema);
