import mongoose from "mongoose";

mongoose.connect(
    String(process.env.MONGO_URL),
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Connected to MongoDb");
        }
    }
);
