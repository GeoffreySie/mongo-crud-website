import mongoose from 'mongoose';

const connectMongodb = async() => {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (mongodbUri) {
      await mongoose.connect(mongodbUri);
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.log('Error connecting to MongoDB');
  }
}

export default connectMongodb;
