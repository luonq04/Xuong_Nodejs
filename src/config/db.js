import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      // useCreateIndex: true,
      // useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};
