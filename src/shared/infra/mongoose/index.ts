import mongoose from "mongoose";

mongoose.connect(
    String(process.env.MONGO_URL),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Connected to MongoDb");
        }
    }
);
